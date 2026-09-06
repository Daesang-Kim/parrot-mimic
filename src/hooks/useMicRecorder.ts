import { useCallback, useEffect, useRef, useState } from 'react'

export type RecorderStatus =
  | 'idle'
  | 'requesting'
  | 'recording'
  | 'recorded'
  | 'error'

export function useMicRecorder() {
  const [status, setStatus] = useState<RecorderStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])

  // The mic indicator stays lit for as long as any track on this stream is
  // live, regardless of MediaRecorder state — always go through this to
  // release it instead of relying on the recorder's own cleanup.
  const releaseStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
  }, [])

  const startRecording = useCallback(async () => {
    setError(null)
    setStatus('requesting')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      chunksRef.current = []

      const recorder = new MediaRecorder(stream)
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data)
      }
      recorder.onstop = () => {
        setAudioBlob(new Blob(chunksRef.current, { type: recorder.mimeType }))
        setStatus('recorded')
        releaseStream()
      }

      mediaRecorderRef.current = recorder
      recorder.start()
      setStatus('recording')
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : '마이크에 접근할 수 없어요. 권한을 확인해주세요.',
      )
      setStatus('error')
    }
  }, [releaseStream])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop()
    } else {
      // Permission was still pending, or something else left a stream
      // open without a running recorder — release it either way.
      releaseStream()
    }
  }, [releaseStream])

  // A recording interrupted by the page going to the background (tab
  // switch, app minimized, phone locked) must never leave the mic running.
  // Discard it instead of finalizing a blob — the app isn't visible to
  // play it back anyway.
  const discardRecording = useCallback(() => {
    const recorder = mediaRecorderRef.current
    if (recorder && recorder.state !== 'inactive') {
      recorder.onstop = null
      recorder.stop()
    }
    releaseStream()
    setStatus((current) =>
      current === 'recording' || current === 'requesting' ? 'idle' : current,
    )
  }, [releaseStream])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') discardRecording()
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('pagehide', discardRecording)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('pagehide', discardRecording)
      discardRecording()
    }
  }, [discardRecording])

  const reset = useCallback(() => {
    setAudioBlob(null)
    setStatus('idle')
    setError(null)
  }, [])

  return { status, error, audioBlob, startRecording, stopRecording, reset }
}
