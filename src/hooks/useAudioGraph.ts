import { useCallback, useRef, useState } from 'react'
import { buildPresetGraph } from '../audio/audioGraph'
import type { VoicePreset } from '../audio/presets'

export function useAudioGraph() {
  const contextRef = useRef<AudioContext | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // Must be called from inside a user gesture handler (tap/click) — iOS
  // Safari refuses to start/resume an AudioContext otherwise.
  const ensureContext = useCallback(() => {
    if (!contextRef.current) {
      contextRef.current = new AudioContext()
    }
    if (contextRef.current.state === 'suspended') {
      void contextRef.current.resume()
    }
    return contextRef.current
  }, [])

  const playBlobWithPreset = useCallback(
    async (blob: Blob, preset: VoicePreset) => {
      const context = ensureContext()
      const arrayBuffer = await blob.arrayBuffer()
      const audioBuffer = await context.decodeAudioData(arrayBuffer)

      const source = context.createBufferSource()
      source.buffer = audioBuffer
      source.playbackRate.value = preset.playbackRate

      const graph = buildPresetGraph(context, preset)
      source.connect(graph.input)
      graph.output.connect(context.destination)

      setIsPlaying(true)
      source.onended = () => {
        graph.dispose()
        setIsPlaying(false)
      }
      source.start()
    },
    [ensureContext],
  )

  return { isPlaying, ensureContext, playBlobWithPreset }
}
