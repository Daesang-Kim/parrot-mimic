export interface BiquadFilterConfig {
  type: BiquadFilterType
  frequency: number
  Q?: number
  gain?: number
}

export interface VoicePreset {
  id: string
  label: string
  emoji: string
  /** Speed-based pitch shift (1 = unchanged). Also changes playback duration. */
  playbackRate: number
  filters: BiquadFilterConfig[]
  /** 0 disables distortion. */
  distortionAmount?: number
  /** Amplitude tremolo, used for the "alien" wobble. */
  tremolo?: { rateHz: number; depth: number }
}

// Single source of truth for voice presets. Add a new toy voice by adding
// an entry here — UI and playback both iterate this list without branching
// on preset id.
export const VOICE_PRESETS: VoicePreset[] = [
  {
    id: 'robot',
    label: '로봇',
    emoji: '🤖',
    playbackRate: 0.95,
    filters: [{ type: 'lowpass', frequency: 2200, Q: 0.7 }],
    distortionAmount: 0.4,
  },
  {
    id: 'baby',
    label: '아기',
    emoji: '👶',
    playbackRate: 1.5,
    filters: [{ type: 'highpass', frequency: 300, Q: 0.7 }],
  },
  {
    id: 'giant',
    label: '거인',
    emoji: '🗿',
    playbackRate: 0.65,
    filters: [{ type: 'lowpass', frequency: 1500, Q: 0.7 }],
  },
  {
    id: 'alien',
    label: '외계인',
    emoji: '👽',
    playbackRate: 1.25,
    filters: [{ type: 'bandpass', frequency: 1800, Q: 4 }],
    tremolo: { rateHz: 9, depth: 0.5 },
  },
  {
    id: 'chipmunk',
    label: '다람쥐',
    emoji: '🐿️',
    playbackRate: 1.8,
    filters: [{ type: 'highpass', frequency: 400, Q: 0.7 }],
  },
]

export const DEFAULT_PRESET_ID = VOICE_PRESETS[0].id
