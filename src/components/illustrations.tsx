import { useId, type ReactNode } from 'react';
import { HEART_PATH, RECEIPT_PATH } from './CampaignLogo';

/**
 * Ilustrações próprias da campanha (SVG). Servem de apoio visual enquanto as
 * fotografias reais do CEI não são adicionadas — não são fotos e não simulam fotos.
 */

export type ArtKey = 'picnic' | 'play' | 'colors' | 'music' | 'paint' | 'blocks';

const safeId = (raw: string) => raw.replace(/[^a-zA-Z0-9_-]/g, '');

function Sparkle({ x, y, s = 1, fill = '#fff', o = 1 }: { x: number; y: number; s?: number; fill?: string; o?: number }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0-12Q2.5-2.5 12 0Q2.5 2.5 0 12Q-2.5 2.5-12 0Q-2.5-2.5 0-12Z"
      fill={fill}
      opacity={o}
    />
  );
}

/* ───────────── Arte principal do hero (quando não há foto) ───────────── */
export function HeroArt({ className }: { className?: string }) {
  const id = safeId(useId());
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Ilustração de uma nota fiscal com um coração, cercada de formas coloridas">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFC23D" />
          <stop offset="0.5" stopColor="#FF6454" />
          <stop offset="1" stopColor="#FF247D" />
        </linearGradient>
        <filter id={`${id}-sh`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#7A1442" floodOpacity="0.35" />
        </filter>
      </defs>
      <rect width="400" height="400" fill={`url(#${id}-bg)`} />
      <circle cx="340" cy="60" r="120" fill="#fff" opacity="0.16" />
      <circle cx="40" cy="360" r="110" fill="#fff" opacity="0.12" />
      <circle cx="70" cy="90" r="46" fill="#fff" opacity="0.2" />
      <circle cx="350" cy="330" r="34" fill="#FFAA20" opacity="0.9" />
      <g filter={`url(#${id}-sh)`}>
        <g transform="translate(200 206) rotate(-5) scale(5.1) translate(-24 -23.5)">
          <path d={RECEIPT_PATH} fill="#fff" />
          <path d={HEART_PATH} fill="#FF247D" />
          <rect x="16" y="32.5" width="16" height="2.6" rx="1.3" fill="#C9D6F2" />
          <rect x="16" y="37" width="10" height="2.6" rx="1.3" fill="#C9D6F2" />
        </g>
      </g>
      <Sparkle x={92} y={236} s={1.5} />
      <Sparkle x={316} y={128} s={1.2} />
      <Sparkle x={300} y={300} s={0.8} o={0.85} />
      <Sparkle x={130} y={60} s={0.9} o={0.85} />
      <g transform="translate(78 300) rotate(-28)">
        <rect width="64" height="15" rx="7.5" fill="#00A9E5" />
        <rect x="46" width="18" height="15" rx="7.5" fill="#fff" opacity="0.45" />
      </g>
      <g transform="translate(300 214) rotate(32)">
        <rect width="58" height="14" rx="7" fill="#773FA3" />
        <rect x="42" width="16" height="14" rx="7" fill="#fff" opacity="0.4" />
      </g>
      <circle cx="120" cy="150" r="7" fill="#fff" opacity="0.8" />
      <circle cx="285" cy="62" r="5" fill="#fff" opacity="0.8" />
      <circle cx="224" cy="352" r="6" fill="#fff" opacity="0.7" />
    </svg>
  );
}

/* ───────────── Tiles da galeria (fallback) ───────────── */
function ArtFrame({ children, from, to }: { children: ReactNode; from: string; to: string }) {
  const id = safeId(useId());
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${id}-bg)`} />
      {children}
    </svg>
  );
}

function Picnic() {
  return (
    <ArtFrame from="#FFE3AD" to="#FFB77A">
      <circle cx="318" cy="70" r="58" fill="#fff" opacity="0.35" />
      <circle cx="318" cy="70" r="40" fill="#FFAA20" />
      <path d="M0 210Q110 150 220 200T400 180V300H0Z" fill="#00A9E5" opacity="0.8" />
      <path d="M0 240Q130 190 250 235T400 225V300H0Z" fill="#29469D" opacity="0.85" />
      <polygon points="92,232 308,232 352,290 48,290" fill="#FF247D" />
      <g fill="#fff" opacity="0.55">
        <polygon points="130,232 162,232 156,290 118,290" />
        <polygon points="226,232 258,232 266,290 232,290" />
      </g>
      <rect x="168" y="196" width="64" height="40" rx="9" fill="#773FA3" />
      <path d="M176 198Q200 162 224 198" fill="none" stroke="#5A2D80" strokeWidth="6" strokeLinecap="round" />
      <circle cx="262" cy="224" r="13" fill="#FF6454" />
      <path d="M262 212q4-8 9-8" stroke="#2A5C9A" strokeWidth="4" strokeLinecap="round" fill="none" />
      <Sparkle x={70} y={70} s={1.1} fill="#fff" o={0.9} />
    </ArtFrame>
  );
}

function Play() {
  return (
    <ArtFrame from="#00A9E5" to="#8BE0FF">
      <ellipse cx="90" cy="70" rx="46" ry="16" fill="#fff" opacity="0.85" />
      <ellipse cx="124" cy="60" rx="30" ry="16" fill="#fff" opacity="0.85" />
      <ellipse cx="330" cy="150" rx="40" ry="13" fill="#fff" opacity="0.7" />
      <path d="M0 238Q120 190 240 232T400 214V300H0Z" fill="#773FA3" opacity="0.85" />
      <path d="M0 266Q140 226 270 262T400 250V300H0Z" fill="#29469D" />
      <g transform="translate(262 92) rotate(14)">
        <polygon points="0,-58 40,0 0,64 -40,0" fill="#FFAA20" />
        <polygon points="0,-58 40,0 0,0" fill="#FF247D" />
        <polygon points="0,64 -40,0 0,0" fill="#fff" opacity="0.85" />
        <path d="M0 64Q-18 98 6 122T-8 168" stroke="#fff" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M-2 92l-12-6 3 14zM2 130l12-6-3 14z" fill="#FF247D" />
      </g>
      <path d="M254 154Q170 200 66 268" stroke="#fff" strokeWidth="2.5" fill="none" opacity="0.9" />
    </ArtFrame>
  );
}

function Colors() {
  return (
    <ArtFrame from="#FFFFFF" to="#EAF1FF">
      <g style={{ mixBlendMode: 'multiply' }}>
        <circle cx="158" cy="128" r="84" fill="#00A9E5" opacity="0.88" />
        <circle cx="244" cy="128" r="84" fill="#FF247D" opacity="0.88" />
        <circle cx="200" cy="198" r="84" fill="#FFAA20" opacity="0.92" />
      </g>
      <circle cx="58" cy="60" r="14" fill="#773FA3" />
      <circle cx="350" cy="244" r="18" fill="#00A9E5" />
      <circle cx="340" cy="52" r="9" fill="#FF6454" />
      <circle cx="46" cy="246" r="10" fill="#FF247D" />
    </ArtFrame>
  );
}

function Music() {
  return (
    <ArtFrame from="#773FA3" to="#FF247D">
      <g fill="none" stroke="#fff" opacity="0.22" strokeWidth="3">
        <circle cx="200" cy="150" r="70" />
        <circle cx="200" cy="150" r="108" />
        <circle cx="200" cy="150" r="148" />
      </g>
      <g fill="#fff">
        <ellipse cx="146" cy="202" rx="25" ry="18" transform="rotate(-22 146 202)" />
        <ellipse cx="252" cy="182" rx="25" ry="18" transform="rotate(-22 252 182)" />
        <rect x="164" y="100" width="7" height="100" rx="3" />
        <rect x="270" y="80" width="7" height="100" rx="3" />
        <polygon points="164,100 277,78 277,102 164,124" />
      </g>
      <Sparkle x={74} y={72} s={1.3} fill="#FFAA20" />
      <Sparkle x={332} y={232} s={1.1} fill="#FFAA20" />
      <Sparkle x={338} y={64} s={0.8} />
    </ArtFrame>
  );
}

function Paint() {
  return (
    <ArtFrame from="#29469D" to="#00A9E5">
      <g fill="none" strokeLinecap="round">
        <path d="M44 220C100 150 150 270 210 196S316 120 360 170" stroke="#FF247D" strokeWidth="32" />
        <path d="M56 140C120 90 170 190 232 128S322 70 352 96" stroke="#FFAA20" strokeWidth="26" />
        <path d="M70 262C130 232 190 284 250 252S330 236 356 250" stroke="#fff" strokeWidth="20" opacity="0.92" />
      </g>
      <circle cx="318" cy="228" r="9" fill="#FF6454" />
      <circle cx="98" cy="60" r="8" fill="#FFAA20" />
      <circle cx="360" cy="54" r="13" fill="#FF247D" />
      <circle cx="34" cy="116" r="6" fill="#fff" />
    </ArtFrame>
  );
}

function Blocks() {
  return (
    <ArtFrame from="#FFF1D6" to="#FFD3E2">
      <rect x="70" y="170" width="86" height="86" rx="14" fill="#00A9E5" />
      <rect x="164" y="170" width="86" height="86" rx="14" fill="#FFAA20" />
      <rect x="112" y="84" width="86" height="86" rx="14" fill="#FF247D" transform="rotate(-8 155 127)" />
      <circle cx="304" cy="216" r="42" fill="#773FA3" />
      <polygon points="262,150 332,150 297,96" fill="#FF6454" />
      <g fill="#fff" opacity="0.9">
        <circle cx="113" cy="213" r="9" />
        <circle cx="207" cy="213" r="9" />
        <circle cx="155" cy="127" r="9" />
      </g>
    </ArtFrame>
  );
}

const ARTS: Record<ArtKey, () => ReactNode> = {
  picnic: Picnic,
  play: Play,
  colors: Colors,
  music: Music,
  paint: Paint,
  blocks: Blocks,
};

export function Art({ name }: { name: ArtKey }) {
  const Component = ARTS[name];
  return <Component />;
}
