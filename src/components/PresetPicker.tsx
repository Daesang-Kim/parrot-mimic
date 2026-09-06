import type { VoicePreset } from '../audio/presets'

interface PresetPickerProps {
  presets: VoicePreset[]
  selectedId: string
  onSelect: (id: string) => void
}

export function PresetPicker({ presets, selectedId, onSelect }: PresetPickerProps) {
  return (
    <div className="preset-picker" role="radiogroup" aria-label="목소리 프리셋">
      {presets.map((preset) => (
        <button
          key={preset.id}
          type="button"
          role="radio"
          aria-checked={preset.id === selectedId}
          className={`preset-chip ${preset.id === selectedId ? 'preset-chip--selected' : ''}`}
          onClick={() => onSelect(preset.id)}
        >
          <span className="preset-chip__emoji">{preset.emoji}</span>
          <span>{preset.label}</span>
        </button>
      ))}
    </div>
  )
}
