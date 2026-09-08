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
      aria-label="빨간 스칼렛 마카오 앵무새 캐릭터"
    >
      <svg viewBox="0 0 260 300" className="parrot-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bodyGrad" cx="38%" cy="28%" r="78%">
            <stop offset="0%" stopColor="#ff7a5c" />
            <stop offset="55%" stopColor="#e6402c" />
            <stop offset="100%" stopColor="#a82415" />
          </radialGradient>
          <linearGradient id="wingRedGrad" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" stopColor="#f26248" />
            <stop offset="100%" stopColor="#c02a1c" />
          </linearGradient>
          <linearGradient id="wingYellowGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffe58a" />
            <stop offset="100%" stopColor="#f0ac2e" />
          </linearGradient>
          <linearGradient id="wingBlueGrad" x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0%" stopColor="#6cc3ef" />
            <stop offset="100%" stopColor="#2a6da3" />
          </linearGradient>
          <linearGradient id="beakGrad" x1="0" y1="0" x2="1" y2="0.5">
            <stop offset="0%" stopColor="#efe7d0" />
            <stop offset="42%" stopColor="#c3b790" />
            <stop offset="72%" stopColor="#524d47" />
            <stop offset="100%" stopColor="#201f1e" />
          </linearGradient>
          <linearGradient id="beakLowerGrad" x1="0" y1="0" x2="1" y2="0.3">
            <stop offset="0%" stopColor="#3a3835" />
            <stop offset="100%" stopColor="#161615" />
          </linearGradient>
          <radialGradient id="eyeGrad" cx="35%" cy="32%" r="70%">
            <stop offset="0%" stopColor="#fff6cf" />
            <stop offset="55%" stopColor="#f2c94c" />
            <stop offset="100%" stopColor="#b9821a" />
          </radialGradient>
          <radialGradient id="faceGrad" cx="42%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#fffaf1" />
            <stop offset="100%" stopColor="#f0e2c8" />
          </radialGradient>
          <filter id="softBlur" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <filter id="grain" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" result="noise" />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0"
            />
          </filter>
          <clipPath id="bodyClip">
            <ellipse cx="130" cy="210" rx="60" ry="66" />
          </clipPath>
        </defs>

        <ellipse
          className="parrot-shadow"
          cx="128"
          cy="282"
          rx="52"
          ry="10"
          fill="#000"
          opacity="0.18"
          filter="url(#softBlur)"
        />

        <g className="parrot-tail">
          <path d="M150,220 C205,224 236,246 244,270 C214,268 186,258 158,240 Z" fill="url(#wingRedGrad)" />
          <path d="M160,230 C204,236 228,254 236,270 C212,268 190,260 168,246 Z" fill="url(#wingBlueGrad)" opacity="0.9" />
          <path d="M212,254 C226,260 234,266 236,270 C224,269 214,266 206,260 Z" fill="#dff0fa" opacity="0.7" />
        </g>

        <g className="parrot-wing parrot-wing-right">
          <path d="M148,150 C182,144 202,168 200,206 C200,214 195,222 188,226 C192,196 178,166 148,158 Z" fill="url(#wingRedGrad)" />
          <path d="M156,168 C176,168 188,184 187,206 C187,212 183,219 178,222 C182,198 172,178 156,174 Z" fill="url(#wingYellowGrad)" />
          <path d="M160,186 C174,188 182,198 181,214 C181,219 178,224 174,226 C177,208 170,194 160,190 Z" fill="url(#wingBlueGrad)" />
        </g>

        <g className="parrot-body">
          <ellipse cx="130" cy="210" rx="60" ry="66" fill="url(#bodyGrad)" />
          <ellipse cx="130" cy="240" rx="40" ry="32" fill="#7a1c10" opacity="0.22" filter="url(#softBlur)" />
          <rect x="70" y="144" width="120" height="132" filter="url(#grain)" clipPath="url(#bodyClip)" />
        </g>

        <g className="parrot-foot parrot-foot-left">
          <rect x="103" y="270" width="6" height="10" rx="3" fill="#3a3a3a" />
          <ellipse cx="103" cy="282" rx="12" ry="5.5" fill="#2b2b2b" />
          <path d="M94,282 q9,-6 18,0" stroke="#161616" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </g>
        <g className="parrot-foot parrot-foot-right">
          <rect x="147" y="270" width="6" height="10" rx="3" fill="#3a3a3a" />
          <ellipse cx="153" cy="282" rx="12" ry="5.5" fill="#2b2b2b" />
          <path d="M144,282 q9,-6 18,0" stroke="#161616" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </g>

        <g className="parrot-wing parrot-wing-left">
          <path d="M112,150 C78,144 58,168 60,206 C60,214 65,222 72,226 C68,196 82,166 112,158 Z" fill="url(#wingRedGrad)" />
          <path d="M104,168 C84,168 72,184 73,206 C73,212 77,219 82,222 C78,198 88,178 104,174 Z" fill="url(#wingYellowGrad)" />
          <path d="M100,186 C86,188 78,198 79,214 C79,219 82,224 86,226 C83,208 90,194 100,190 Z" fill="url(#wingBlueGrad)" />
        </g>

        <g className="parrot-head">
          <path
            d="M78,118 C78,66 182,66 182,118 C182,150 156,168 130,168 C104,168 78,150 78,118 Z"
            fill="url(#bodyGrad)"
          />

          <path
            d="M92,118 C92,90 118,74 140,80 C158,85 168,102 164,122 C160,144 138,156 118,150 C100,145 92,134 92,118 Z"
            fill="url(#faceGrad)"
          />

          <g className="parrot-brow">
            <path d="M104,96 q8,-8 18,-5" stroke="#c0452f" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.75" />
            <path d="M100,106 q9,-7 20,-4" stroke="#c0452f" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.75" />
            <path d="M99,116 q9,-6 19,-3" stroke="#c0452f" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.75" />
            <path d="M101,126 q8,-5 17,-2" stroke="#c0452f" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.6" />
          </g>

          <g className="parrot-eye">
            <circle cx="126" cy="112" r="10" fill="url(#eyeGrad)" />
            <circle cx="126" cy="112" r="4.6" fill="#161311" />
            <circle cx="123.5" cy="109" r="1.8" fill="#fff" opacity="0.9" />
            <circle cx="126" cy="112" r="10" fill="none" stroke="#8a5f14" strokeWidth="0.8" opacity="0.5" />
          </g>

          <g className="parrot-beak">
            <path
              className="parrot-beak-upper"
              d="M52,120 C40,126 38,142 52,150 C74,163 106,153 118,132 C124,121 114,106 96,105 C80,105 62,110 52,120 Z"
              fill="url(#beakGrad)"
            />
            <ellipse cx="88" cy="112" rx="2.6" ry="3.4" fill="#2a2621" opacity="0.65" />
            <path
              className="parrot-beak-lower"
              d="M60,140 C55,148 61,158 76,159 C90,160 102,152 105,142 C90,150 73,150 60,140 Z"
              fill="url(#beakLowerGrad)"
            />
          </g>
        </g>
      </svg>
    </div>
  )
}
