import type { ReactNode } from 'react';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import type { Tone } from './Modal';

interface Props {
  tone: Tone;
  icon: LucideIcon;
  title: string;
  description: string;
  cta: string;
  onClick: () => void;
  /** Card principal (largura total, maior destaque). */
  featured?: boolean;
  /** Card de menor destaque (largura total, mais baixo). */
  compact?: boolean;
  badge?: string;
  /** Conteúdo extra à direita (apenas desktop). */
  aside?: ReactNode;
  className?: string;
}

/** Botão-card com degradê. Abre um painel (modal) com os detalhes. */
export function CampaignCard({
  tone,
  icon: Icon,
  title,
  description,
  cta,
  onClick,
  featured,
  compact,
  badge,
  aside,
  className = '',
}: Props) {
  if (compact) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-haspopup="dialog"
        className={`campaign-card on-gradient tone-${tone} !p-5 sm:!p-6 ${className}`}
      >
        <span className="flex items-center gap-4">
          <span className="card-icon grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/20 ring-1 ring-white/30 sm:h-14 sm:w-14">
            <Icon size={26} aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-xl font-bold leading-tight sm:text-2xl">{title}</span>
            <span className="mt-0.5 block text-base leading-snug text-white sm:text-[1.0625rem]">{description}</span>
          </span>
          <span className="hidden items-center gap-2 rounded-full bg-white px-5 py-3 text-base font-bold text-[#5B22C9] shadow-[0_6px_16px_rgba(60,10,120,0.25)] sm:inline-flex">
            {cta.replace(' →', '')}
            <ArrowRight className="card-arrow" size={20} aria-hidden />
          </span>
          <ArrowRight className="card-arrow shrink-0 sm:hidden" size={24} aria-hidden />
        </span>
        <span className="sr-only">{cta}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      className={`campaign-card on-gradient tone-${tone} flex flex-col ${featured ? '!p-6 sm:!p-9 md:!p-11' : '!p-5 sm:!p-8'} ${className}`}
    >
      <span className={featured ? 'grid w-full items-center gap-8 md:grid-cols-[1.25fr_1fr]' : 'flex h-full flex-col'}>
        <span className="flex flex-col items-start">
          {badge && (
            <span className="mb-4 inline-flex rounded-full bg-white px-3.5 py-1.5 text-sm font-bold text-brand-deep shadow-sm">
              {badge}
            </span>
          )}
          <span
            className={`card-icon grid place-items-center rounded-2xl bg-white/20 ring-1 ring-white/30 ${
              featured ? 'h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]' : 'h-12 w-12 sm:h-14 sm:w-14'
            }`}
          >
            <Icon size={featured ? 34 : 26} aria-hidden />
          </span>
          <span
            className={`mt-4 block font-extrabold leading-[1.08] tracking-tight ${
              featured ? 'text-[2rem] sm:text-5xl' : 'text-[1.2rem] min-[400px]:text-[1.35rem] sm:text-3xl'
            }`}
          >
            {title}
          </span>
          <span
            className={`mt-2 block text-pretty text-white ${
              featured ? 'max-w-[34ch] text-lg leading-snug sm:text-xl' : 'text-[0.9375rem] leading-snug sm:text-lg'
            }`}
          >
            {description}
          </span>

          {featured ? (
            <span className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full bg-white px-5 text-center text-[1.0625rem] font-bold leading-tight text-brand-deep shadow-[0_10px_26px_rgba(10,20,80,0.28)] sm:w-auto sm:px-7 sm:text-lg">
              {cta.replace(' →', '')}
              <ArrowRight className="card-arrow shrink-0" size={22} strokeWidth={2.6} aria-hidden />
            </span>
          ) : (
            <span className="mt-4 inline-flex items-center gap-2 text-base font-bold sm:mt-5 sm:text-lg">
              {cta.replace(' →', '')}
              <ArrowRight className="card-arrow" size={20} strokeWidth={2.6} aria-hidden />
            </span>
          )}
        </span>
        {featured && aside && <span className="hidden md:block">{aside}</span>}
      </span>
    </button>
  );
}
