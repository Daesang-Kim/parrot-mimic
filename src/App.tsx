import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { DEFAULT_PRESET_ID, VOICE_PRESETS } from './audio/presets'
import { ParrotCharacter } from './components/ParrotCharacter'
import { PresetPicker } from './components/PresetPicker'
import { RecordButton } from './components/RecordButton'
import { useAudioGraph } from './hooks/useAudioGraph'
import { useMicRecorder } from './hooks/useMicRecorder'

const isMicSupported =
  typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia

function statusMessage(
  status: ReturnType<typeof useMicRecorder>['status'],
  isPlaying: boolean,
  error: string | null,
) {
  if (!isMicSupported) return '이 브라우저는 마이크 녹음을 지원하지 않아요.'
  if (status === 'error') return error ?? '문제가 발생했어요. 다시 시도해주세요.'
  if (isPlaying) return '앵무새가 따라 말하는 중...'
  switch (status) {
    case 'requesting':
      return '마이크 권한을 확인하는 중...'
    case 'recording':
      return '듣는 중... 손을 떼면 따라 말해요'
    case 'recorded':
      return '따라 말할 준비 중...'
    default:
      return '버튼을 누르고 있는 동안 말해보세요'
  }
}

function App() {
  const [presetId, setPresetId] = useState(DEFAULT_PRESET_ID)
  const preset = useMemo(
    () => VOICE_PRESETS.find((p) => p.id === presetId) ?? VOICE_PRESETS[0],
    [presetId],
  )

  const { status, error, audioBlob, startRecording, stopRecording, reset } =
    useMicRecorder()
  const { isPlaying, ensureContext, playBlobWithPreset } = useAudioGraph()

  useEffect(() => {
    if (status === 'recorded' && audioBlob) {
      void playBlobWithPreset(audioBlob, preset)
      reset()
    }
  }, [status, audioBlob, preset, playBlobWithPreset, reset])

  const handlePressStart = () => {
    if (!isMicSupported) return
    ensureContext() // must happen inside this gesture for iOS Safari
    void startRecording()
  }

  const handlePressEnd = () => {
    if (status === 'recording') stopRecording()
  }

  return (
    <main className="app">
      <header className="app__header">
        <h1 className="app__title">🦜 앵무새 흉내내기</h1>
      </header>

      <section className="app__stage">
        <ParrotCharacter isRecording={status === 'recording'} isPlaying={isPlaying} />
      </section>

      <section className="app__controls">
        <p className="app__status">{statusMessage(status, isPlaying, error)}</p>

        <RecordButton
          isRecording={status === 'recording'}
          disabled={!isMicSupported || status === 'requesting'}
          label={status === 'recording' ? '놓으면 재생' : '눌러서 말하기'}
          onPressStart={handlePressStart}
          onPressEnd={handlePressEnd}
        />

        <PresetPicker
          presets={VOICE_PRESETS}
          selectedId={preset.id}
          onSelect={setPresetId}
        />
      </section>
    </main>
  )
}

export default App
