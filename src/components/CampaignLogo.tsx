import { useId } from 'react';

export const RECEIPT_PATH = 'M13 3H35A4 4 0 0 1 39 7V44L34 40.5L29 44L24 40.5L19 44L14 40.5L9 44V7A4 4 0 0 1 13 3Z';
export const HEART_PATH =
  'M24 29C24 29 15 23 15 17.5C15 14.5 17.3 12.5 19.8 12.5C21.6 12.5 23.2 13.5 24 15C24.8 13.5 26.4 12.5 28.2 12.5C30.7 12.5 33 14.5 33 17.5C33 23 24 29 24 29Z';

const safeId = (raw: string) => raw.replace(/[^a-zA-Z0-9_-]/g, '');

interface SymbolProps {
  /** light = versão branca para fundos coloridos; color = versão em degradê para fundos claros */
  variant?: 'light' | 'color';
  className?: string;
}

/** Símbolo da campanha: uma nota fiscal com um coração. */
export function LogoSymbol({ variant = 'light', className }: SymbolProps) {
  const id = safeId(useId());
  const light = variant === 'light';
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-r`} x1="9" y1="3" x2="39" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#00A9E5" />
          <stop offset="1" stopColor="#29469D" />
        </linearGradient>
        <linearGradient id={`${id}-h`} x1="15" y1="12" x2="33" y2="29" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF247D" />
          <stop offset="1" stopColor="#FF6454" />
        </linearGradient>
      </defs>
      <path d={RECEIPT_PATH} fill={light ? '#fff' : `url(#${id}-r)`} />
      <path d={HEART_PATH} fill={light ? '#FF247D' : `url(#${id}-h)`} />
      <rect x="16" y="32.5" width="16" height="2.6" rx="1.3" fill={light ? '#BFD0F0' : '#fff'} opacity={light ? 1 : 0.65} />
      <rect x="16" y="37" width="10" height="2.6" rx="1.3" fill={light ? '#BFD0F0' : '#fff'} opacity={light ? 1 : 0.65} />
    </svg>
  );
}

interface LogoProps {
  variant?: 'light' | 'color';
  /** Mostra a linha "CEI Madre Teresa de Calcutá" abaixo do nome da campanha. */
  showInstitution?: boolean;
  className?: string;
}

/**
 * Logotipo completo: símbolo + "Nota solidária." (só o N maiúsculo) + identificação do CEI.
 * Não substitui o logotipo oficial da instituição.
 */
export function CampaignLogo({ variant = 'light', showInstitution = true, className = '' }: LogoProps) {
  const light = variant === 'light';
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoSymbol variant={variant} className="h-10 w-10 shrink-0 sm:h-11 sm:w-11" />
      <span className="flex flex-col whitespace-nowrap leading-none">
        <span
          className={`text-[1.65rem] font-bold tracking-tight sm:text-[1.85rem] ${light ? 'text-white' : 'text-brand-deep'}`}
        >
          Nota solidária<span className={light ? 'text-brand-amber' : 'text-brand-pink'}>.</span>
        </span>
        {showInstitution && (
          <span
            className={`mt-1 text-[0.64rem] font-semibold tracking-wide sm:text-[0.72rem] ${light ? 'text-white' : 'text-ink-soft'}`}
          >
            CEI Madre Teresa de Calcutá
          </span>
        )}
      </span>
    </span>
  );
}
