import './ParrotCharacter.css'

interface ParrotCharacterProps {
  isRecording: boolean
  isPlaying: boolean
}

export function ParrotCharacter({ isRecording, isPlaying }: ParrotCharacterProps) {
  const mood = isPlaying ? 'talking' : isRecording ? 'listening' : 'idle'

  return (
    <div
      className={`parrot-stage parrot-stage--${mood}`}
      role="img"
      aria-label="빨간 앵무새 캐릭터"
    >
      <svg viewBox="0 0 240 260" className="parrot-svg" xmlns="http://www.w3.org/2000/svg">
        <g className="parrot-tail">
          <path
            d="M148,196 C205,198 232,222 236,246 C206,244 176,236 150,218 Z"
            fill="#d63a2c"
          />
          <path
            d="M206,228 C224,234 233,242 236,246 C222,245 209,241 199,233 Z"
            fill="#8fd0ec"
          />
        </g>

        <g className="parrot-wing parrot-wing-right">
          <path
            d="M150,142 C186,138 202,168 196,204 C176,198 155,182 147,157 Z"
            fill="#e0402f"
          />
          <path
            d="M171,182 C186,192 193,199 196,204 C182,202 170,196 162,186 Z"
            fill="#8fd0ec"
          />
        </g>

        <g className="parrot-body">
          <ellipse cx="120" cy="190" rx="58" ry="62" fill="#e6402e" />
          <ellipse cx="120" cy="196" rx="34" ry="38" fill="#ef5b46" opacity="0.55" />
        </g>

        <g className="parrot-foot parrot-foot-left">
          <rect x="94" y="240" width="11" height="15" rx="4" fill="#2b2b2b" />
        </g>
        <g className="parrot-foot parrot-foot-right">
          <rect x="131" y="240" width="11" height="15" rx="4" fill="#2b2b2b" />
        </g>

        <g className="parrot-wing parrot-wing-left">
          <path
            d="M90,142 C54,138 38,168 44,204 C64,198 85,182 93,157 Z"
            fill="#e0402f"
          />
          <path
            d="M69,182 C54,192 47,199 44,204 C58,202 70,196 78,186 Z"
            fill="#8fd0ec"
          />
        </g>

        <g className="parrot-neck">
          <ellipse cx="120" cy="130" rx="46" ry="17" fill="#f7c94a" />
        </g>

        <g className="parrot-head">
          <path
            d="M74,96 C74,54 166,54 166,96 C166,122 145,138 120,138 C95,138 74,122 74,96 Z"
            fill="#e0402f"
          />
          <ellipse cx="130" cy="100" rx="37" ry="33" fill="#fbeed6" />

          <g className="parrot-brow">
            <path d="M104,76 q6,-7 15,-4" stroke="#2b2b2b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M107,85 q6,-6 15,-3" stroke="#2b2b2b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M110,94 q6,-5 14,-2" stroke="#2b2b2b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </g>

          <g className="parrot-eye">
            <circle cx="122" cy="93" r="7" fill="#2b2b2b" />
            <circle cx="124.5" cy="90" r="2" fill="#fff" />
          </g>

          <g className="parrot-beak">
            <path
              className="parrot-beak-upper"
              d="M58,97 C48,102 46,114 57,120 C75,130 101,122 110,105 C114,97 105,87 91,87 C79,87 65,90 58,97 Z"
              fill="#4a4f57"
            />
            <path
              className="parrot-beak-lower"
              d="M64,114 C60,120 65,128 78,129 C90,130 100,124 103,116 C90,122 75,122 64,114 Z"
              fill="#383c42"
            />
          </g>
        </g>
      </svg>
    </div>
  )
}
