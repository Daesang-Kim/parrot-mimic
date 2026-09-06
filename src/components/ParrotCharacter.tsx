interface ParrotCharacterProps {
  isRecording: boolean
  isPlaying: boolean
}

export function ParrotCharacter({ isRecording, isPlaying }: ParrotCharacterProps) {
  const mood = isPlaying ? 'talking' : isRecording ? 'listening' : 'idle'

  return (
    <div className={`parrot parrot--${mood}`} role="img" aria-label="앵무새 캐릭터">
      🦜
    </div>
  )
}
