import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

/** Item de lista com ícone em círculo colorido. */
export function IconRow({
  icon: Icon,
  title,
  children,
  tint = 'bg-[#E8EEFC] text-brand-deep',
}: {
  icon: LucideIcon;
  title: string;
  children?: ReactNode;
  tint?: string;
}) {
  return (
    <li className="flex items-start gap-4 rounded-2xl bg-mist p-4 ring-1 ring-[#E3EAF7]">
      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${tint}`}>
        <Icon size={24} aria-hidden />
      </span>
      <span className="min-w-0 flex-1 pt-0.5">
        <span className="block text-lg font-bold leading-snug text-ink">{title}</span>
        {children && <span className="mt-0.5 block text-base leading-snug text-ink-soft">{children}</span>}
      </span>
    </li>
  );
}

/** Caixa de destaque (aviso, dica). */
export function Callout({
  icon: Icon,
  tone = 'sun',
  children,
}: {
  icon: LucideIcon;
  tone?: 'sun' | 'sky' | 'rose';
  children: ReactNode;
}) {
  const tones = {
    sun: 'bg-[#FFF4DD] ring-[#FFD98A] text-ink [&_svg]:text-[#B86E00]',
    sky: 'bg-[#EEF7FF] ring-[#CFE6FA] text-ink [&_svg]:text-brand-deep',
    rose: 'bg-[#FFF0F5] ring-[#FFC6DA] text-ink [&_svg]:text-brand-pink',
  };
  return (
    <div className={`flex gap-3 rounded-2xl p-4 text-base leading-snug ring-1 ${tones[tone]}`}>
      <Icon size={22} className="mt-0.5 shrink-0" aria-hidden />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

/** Ícone do GitHub (a biblioteca de ícones não inclui marcas). */
export function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

/** Ícone do Facebook (a biblioteca de ícones não inclui marcas). */
export function FacebookIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

/** Ícone do Instagram (a biblioteca de ícones não inclui marcas). */
export function InstagramIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
    </svg>
  );
}
