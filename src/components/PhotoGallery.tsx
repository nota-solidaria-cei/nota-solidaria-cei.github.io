import { ChevronsRight } from 'lucide-react';
import { Art } from './illustrations';
import { Reveal } from './Reveal';
import { InstagramIcon } from './ui';
import { institution } from '../config/institution';
import { galleryFallback, galleryPhotos, hasRealPhotos } from '../config/photos';

/**
 * Padrões de composição no desktop; cada bloco fecha uma grade 4×3 sem buracos.
 * 8 fotos: 1 grande + 1 larga + 6 quadradas (as fotos pequenas ficam nas células pequenas).
 * 6 itens: 1 grande + 3 largas + 2 quadradas (usado pelas ilustrações).
 */
const SPANS_8 = ['md:col-span-2 md:row-span-2', '', '', 'md:col-span-2', '', '', '', ''];
const SPANS_6 = ['md:col-span-2 md:row-span-2', '', '', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2'];

export function PhotoGallery() {
  const items = hasRealPhotos ? galleryPhotos : galleryFallback;
  const spans = items.length % 8 === 0 ? SPANS_8 : SPANS_6;

  return (
    <section aria-labelledby="galeria-title" className="mx-auto mt-16 max-w-[980px] px-4 sm:px-8 md:mt-28">
      <Reveal className="mb-5 md:mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-pink">No dia a dia</p>
        <h2 id="galeria-title" className="mt-2 text-balance text-[2rem] font-extrabold leading-tight tracking-tight text-brand-deep sm:text-5xl">
          Cores, brincadeiras e descobertas.
        </h2>
      </Reveal>

      {/* Convite para acompanhar o CEI no Instagram (fica acima das fotos) */}
      <Reveal className="mb-6 md:mb-8">
        <div className="flex flex-col items-center gap-4 rounded-3xl bg-white p-5 text-center shadow-[0_10px_30px_rgba(32,56,107,0.08)] ring-1 ring-[#E3EAF7] sm:flex-row sm:justify-between sm:gap-6 sm:p-5 sm:text-left">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <span className="tone-more on-dark grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white">
              <InstagramIcon size={28} />
            </span>
            <div>
              <h3 className="text-balance text-[1.35rem] font-extrabold leading-tight tracking-tight text-brand-deep sm:text-2xl">
                Acompanhe o impacto da sua boa ação.
              </h3>
              <p className="mt-0.5 text-base text-ink-soft">Veja o dia a dia do CEI no Instagram.</p>
            </div>
          </div>
          <a
            href={institution.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary min-h-14 w-full whitespace-nowrap px-7 text-lg sm:w-auto"
          >
            <InstagramIcon size={22} /> Seguir {institution.instagram.handle}
            <span className="sr-only">(abre o Instagram em nova aba)</span>
          </a>
        </div>
      </Reveal>

      {/* Celular: faixa horizontal com swipe. Desktop: composição em grade. */}
      <div
        role="region"
        aria-label="Galeria de imagens"
        tabIndex={0}
        className="no-scrollbar -mx-4 snap-x snap-mandatory scroll-px-4 overflow-x-auto px-4 pb-3 md:mx-0 md:snap-none md:overflow-visible md:px-0 md:pb-0"
      >
        <ul
          className="flex w-max gap-3 md:grid md:w-auto md:auto-rows-[150px] md:grid-cols-4 md:gap-3.5 lg:auto-rows-[184px]"
          style={{ gridAutoFlow: 'dense' }}
        >
          {items.map((it, i) => (
            <li
              key={it.id}
              className={`relative aspect-[4/5] w-[76vw] max-w-[340px] shrink-0 snap-center overflow-hidden rounded-3xl bg-[#E8EEFC] shadow-[0_10px_26px_rgba(32,56,107,0.12)] sm:w-[44vw] sm:max-w-[360px] md:aspect-auto md:w-auto md:max-w-none ${spans[i % spans.length]}`}
            >
              {it.src ? (
                <img
                  src={it.src}
                  alt={it.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                  style={{ objectPosition: it.position }}
                />
              ) : (
                <div role="img" aria-label={it.alt} className="h-full w-full">
                  <Art name={it.art!} />
                </div>
              )}
              {it.caption && (
                <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[#0F1C3E]/80 to-transparent px-4 pb-3 pt-10 text-base font-semibold text-white">
                  {it.caption}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-2 flex items-center justify-center gap-1.5 text-sm font-medium text-ink-soft md:hidden">
        Deslize para ver mais <ChevronsRight size={18} aria-hidden />
      </p>
    </section>
  );
}
