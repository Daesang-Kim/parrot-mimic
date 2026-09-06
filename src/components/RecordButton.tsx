interface RecordButtonProps {
  isRecording: boolean
  disabled: boolean
  label: string
  onPressStart: () => void
  onPressEnd: () => void
}

export function RecordButton({
  isRecording,
  disabled,
  label,
  onPressStart,
  onPressEnd,
}: RecordButtonProps) {
  return (
    <button
      type="button"
      className={`record-button ${isRecording ? 'record-button--active' : ''}`}
      disabled={disabled}
      onPointerDown={(e) => {
        e.preventDefault()
        onPressStart()
      }}
      onPointerUp={onPressEnd}
      onPointerLeave={() => isRecording && onPressEnd()}
    >
      {label}
    </button>
  )
}
