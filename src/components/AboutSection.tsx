import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Art, type ArtKey } from './illustrations';
import { Collapse } from './Collapse';
import { Reveal } from './Reveal';
import { aboutPhotos, galleryPhotos } from '../config/photos';
import { historyTimeline } from '../config/campaign';
import { institution } from '../config/institution';

const facts = ['Desde 1988', institution.ageRange, 'Período integral', 'Vila Matilde'];

type Media = { src?: string; alt?: string; position?: string; art?: ArtKey };

function pickMedia(): Media[] {
  const photos: Media[] = aboutPhotos.length
    ? aboutPhotos
    : galleryPhotos.filter((g) => g.src).map((g) => ({ src: g.src, alt: g.alt, position: g.position }));
  if (photos.length) return photos.slice(0, 3);
  return [{ art: 'picnic' }, { art: 'paint' }, { art: 'music' }];
}

function Circle({ media, className }: { media?: Media; className: string }) {
  if (!media) return null;
  return (
    <div className={`absolute overflow-hidden rounded-full bg-brand-deep shadow-[0_18px_44px_rgba(32,56,107,0.25)] ring-[6px] ring-white ${className}`}>
      {media.src ? (
        <img
          src={media.src}
          alt={media.alt ?? 'Atividade no CEI Madre Teresa de Calcutá'}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          style={{ objectPosition: media.position }}
        />
      ) : (
        <Art name={media.art!} />
      )}
    </div>
  );
}

export function AboutSection() {
  const [open, setOpen] = useState(false);
  const uid = useId();
  const media = pickMedia();

  return (
    <section id="sobre" aria-labelledby="sobre-title" className="mx-auto mt-16 max-w-[1240px] px-4 sm:px-8 md:mt-28">
      <div className="grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-14">
        <Reveal className="order-2 md:order-1">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-pink">Sobre nós</p>
          <h2 id="sobre-title" className="mt-2 text-balance text-[2rem] font-extrabold leading-tight tracking-tight text-brand-deep sm:text-5xl">
            Uma história construída com cuidado.
          </h2>
          <p className="mt-4 max-w-[50ch] text-pretty text-lg leading-relaxed text-ink sm:text-xl">
            Desde 1988, o {institution.name} acolhe crianças e famílias da Vila Matilde. Hoje, atende {institution.childrenLabel} de {institution.ageRange} em período integral, oferecendo educação, alimentação, cuidado e novas experiências.
          </p>

          <blockquote className="mt-6 border-l-4 border-brand-pink pl-5 text-xl font-bold leading-snug text-brand-deep sm:text-2xl">
            Educação, acolhimento e cuidado para transformar vidas.
          </blockquote>

          <ul className="mt-6 flex flex-wrap gap-2.5">
            {facts.map((f) => (
              <li key={f} className="rounded-full bg-white px-4 py-2 text-base font-semibold text-brand-deep ring-1 ring-[#D6E1F5]">
                {f}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={`${uid}-history`}
            className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full px-1 py-2 text-lg font-bold text-brand-deep underline decoration-brand-pink decoration-2 underline-offset-[6px] active:opacity-70"
          >
            {open ? 'Mostrar menos' : 'Conhecer mais da história'}
            <ChevronDown size={22} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden />
          </button>

          <Collapse open={open} id={`${uid}-history`}>
            <ol className="relative mt-4 flex flex-col gap-5 border-l-2 border-[#D6E1F5] pb-1 pl-6">
              {historyTimeline.map((h) => (
                <li key={h.when} className="relative">
                  <span aria-hidden className="absolute -left-[34px] top-1.5 h-4 w-4 rounded-full bg-brand-pink ring-4 ring-mist" />
                  <p className="text-lg font-extrabold text-brand-deep">{h.when}</p>
                  <p className="mt-0.5 text-base leading-snug text-ink sm:text-lg">{h.text}</p>
                </li>
              ))}
            </ol>
          </Collapse>
        </Reveal>

        {/* Colagem circular */}
        <Reveal delay={100} className="order-1 md:order-2">
          <div className="relative mx-auto aspect-[1/0.92] w-full max-w-[300px] sm:max-w-[520px]">
            <span aria-hidden className="absolute left-[6%] top-[4%] h-[18%] w-[18%] rounded-full bg-brand-amber" />
            <span aria-hidden className="absolute bottom-[2%] left-[26%] h-[11%] w-[11%] rounded-full bg-brand-cyan" />
            <span aria-hidden className="absolute right-[4%] top-[44%] h-[9%] w-[9%] rounded-full bg-brand-pink" />
            <Circle media={media[0]} className="left-[6%] top-[10%] aspect-square w-[62%]" />
            <Circle media={media[1]} className="right-[0%] top-[0%] aspect-square w-[36%]" />
            <Circle media={media[2]} className="bottom-[0%] right-[8%] aspect-square w-[44%]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
