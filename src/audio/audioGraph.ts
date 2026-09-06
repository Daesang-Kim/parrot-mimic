import type { VoicePreset } from './presets'

/** A sigmoid-ish curve; higher `amount` clips harder for a grittier tone. */
function buildDistortionCurve(amount: number): Float32Array<ArrayBuffer> {
  const samples = 44100
  const curve = new Float32Array(samples)
  const k = amount * 100
  for (let i = 0; i < samples; i++) {
    const x = (i * 2) / samples - 1
    curve[i] = ((Math.PI + k) * x) / (Math.PI + k * Math.abs(x))
  }
  return curve
}

export interface PresetGraph {
  /** Connect your source node to this input. */
  input: AudioNode
  /** Connect this to the destination (or another node). */
  output: AudioNode
  /** Stops any running LFOs. Call once playback ends. */
  dispose: () => void
}

/**
 * Builds a Web Audio node chain for a preset. Pure with respect to preset
 * data — the only side effect is creating/starting nodes on the given
 * context, and none of it is React-specific.
 */
export function buildPresetGraph(
  context: BaseAudioContext,
  preset: VoicePreset,
): PresetGraph {
  const disposers: Array<() => void> = []

  const filterNodes = preset.filters.map((config) => {
    const filter = context.createBiquadFilter()
    filter.type = config.type
    filter.frequency.value = config.frequency
    if (config.Q !== undefined) filter.Q.value = config.Q
    if (config.gain !== undefined) filter.gain.value = config.gain
    return filter
  })

  const input = filterNodes[0] ?? context.createGain()
  let previous: AudioNode = input
  for (const filter of filterNodes.slice(1)) {
    previous.connect(filter)
    previous = filter
  }
  let chainEnd: AudioNode = previous

  if (preset.distortionAmount) {
    const shaper = context.createWaveShaper()
    shaper.curve = buildDistortionCurve(preset.distortionAmount)
    shaper.oversample = '4x'
    chainEnd.connect(shaper)
    chainEnd = shaper
  }

  const output = context.createGain()
  chainEnd.connect(output)

  if (preset.tremolo) {
    const tremoloGain = context.createGain()
    output.connect(tremoloGain)

    const lfo = context.createOscillator()
    lfo.frequency.value = preset.tremolo.rateHz
    const lfoDepth = context.createGain()
    lfoDepth.gain.value = preset.tremolo.depth
    const lfoOffset = context.createConstantSource()
    lfoOffset.offset.value = 1 - preset.tremolo.depth

    lfo.connect(lfoDepth)
    lfoDepth.connect(tremoloGain.gain)
    lfoOffset.connect(tremoloGain.gain)

    lfo.start()
    lfoOffset.start()
    disposers.push(() => {
      lfo.stop()
      lfoOffset.stop()
    })

    return {
      input,
      output: tremoloGain,
      dispose: () => disposers.forEach((d) => d()),
    }
  }

  return { input, output, dispose: () => disposers.forEach((d) => d()) }
}
