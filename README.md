# 앵무새 흉내내기 (parrot-mimic)

마이크로 말하면 목소리를 변조해서 앵무새가 따라 말해주는 모바일 웹 장난감/게임.
설계 방향과 이유는 `.claude/skills/parrot-mimic-dev/SKILL.md`에 정리되어 있다.

## 기술 스택

- React + TypeScript + Vite
- 오디오 녹음/변조: 브라우저 네이티브 Web Audio API (`src/audio`)
- PWA: `vite-plugin-pwa` (홈 화면 설치, 오프라인 지원)
- 서버 없음 — 모든 처리는 클라이언트에서 끝난다.

## 시작하기

```bash
npm install
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드 (tsc + vite build)
npm run lint      # oxlint
npm run preview   # 빌드 결과 로컬 미리보기
```

마이크 접근은 브라우저가 HTTPS(또는 localhost)로 판단하는 origin에서만 동작한다.
모바일 실기기 테스트 시 HTTPS 터널(예: `ngrok`)이나 배포 환경에서 확인한다.

## 폴더 구조

```
src/
  audio/        # AudioContext 그래프, 프리셋 정의 (React 비의존, 순수 로직)
  hooks/        # useMicRecorder, useAudioGraph
  components/   # ParrotCharacter, RecordButton, PresetPicker
  App.tsx       # 화면 조립
public/
  icons/        # PWA/애플 터치 아이콘 (플레이스홀더 — 실제 아트로 교체 필요)
```

## 알려진 제한 사항 / TODO

- `public/icons/*.png`는 자리표시용 단색 아이콘이다. 실제 캐릭터 아트로 교체할 것.
- 피치 변경은 `playbackRate` 기반이라 속도도 함께 변한다 (MVP 범위). 포먼트 보존
  피치 시프트가 필요해지면 AudioWorklet 기반 처리를 검토한다.
- 녹음 저장/공유, 점수·컬렉션 등 게임화 요소는 다음 단계 범위다.
