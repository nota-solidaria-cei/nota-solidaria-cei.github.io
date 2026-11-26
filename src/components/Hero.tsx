import { ArrowDown, CircleCheck } from 'lucide-react';
import { Header } from './Header';
import { HeroArt } from './illustrations';
import { heroPhoto } from '../config/photos';
import { campaign } from '../config/campaign';
import { institution } from '../config/institution';

export function Hero() {
  return (
    <div id="topo" className="grad-hero on-dark relative overflow-hidden rounded-b-[36px] text-white md:rounded-b-[64px]">
      {/* Formas decorativas */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="absolute -left-24 -top-28 h-72 w-72 rounded-full bg-brand-cyan/30 blur-2xl md:h-[26rem] md:w-[26rem]" />
        <span className="absolute -bottom-32 left-[38%] hidden h-80 w-80 rounded-full bg-brand-purple/35 blur-2xl md:block" />
        <span className="absolute right-[-6rem] top-24 hidden h-[34rem] w-[34rem] rounded-full border-[3px] border-white/15 lg:block" />
        <span className="absolute right-[-10rem] top-10 hidden h-[44rem] w-[44rem] rounded-full border-2 border-white/10 lg:block" />
      </div>

      <Header />

      <section
        aria-labelledby="hero-title"
        className="relative mx-auto grid max-w-[1240px] items-center gap-6 px-4 pb-20 pt-2 text-center sm:px-8 md:grid-cols-[1.08fr_0.92fr] md:gap-10 md:pb-32 md:pt-6 md:text-left"
      >
        {/* Fotografia / arte circular — acima do texto no celular, à direita no desktop */}
        <div className="hero-art-in order-1 mx-auto w-full md:order-2">
          <div className="relative mx-auto aspect-square w-[min(44vw,172px)] sm:w-[220px] md:w-[min(100%,440px)] lg:w-[min(100%,480px)]">
            <span aria-hidden className="float-soft absolute -right-[7%] top-[2%] z-10 h-[24%] w-[24%] rounded-full bg-brand-amber shadow-lg" />
            <span aria-hidden className="absolute -left-[9%] bottom-[10%] z-10 h-[17%] w-[17%] rounded-full bg-brand-pink shadow-lg" />
            <span aria-hidden className="absolute -bottom-[3%] right-[12%] z-10 h-[10%] w-[10%] rounded-full bg-brand-cyan ring-4 ring-white/40" />
            <span aria-hidden className="absolute -inset-[7%] rounded-full border-2 border-white/35" />
            <div className="absolute inset-0 overflow-hidden rounded-full bg-brand-deep shadow-[0_24px_60px_rgba(8,24,80,0.45)] ring-[6px] ring-white/80 md:ring-8">
              {heroPhoto ? (
                <img
                  src={heroPhoto.src}
                  alt={heroPhoto.alt}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: heroPhoto.position }}
                  fetchPriority="high"
                  decoding="async"
                />
              ) : (
                <HeroArt className="h-full w-full" />
              )}
            </div>
          </div>
        </div>

        <div className="order-2 md:order-1">
          <p className="hero-in inline-flex rounded-full bg-[#0A2A70]/50 px-4 py-1.5 text-sm font-semibold tracking-wide text-white ring-1 ring-white/30 sm:text-base">
            {campaign.tagline}
          </p>
          <h1
            id="hero-title"
            className="hero-in hero-in-2 mt-3 text-balance text-[2.5rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl md:mt-5 lg:text-[5rem]"
          >
            Sua nota <span className="text-gradient-sun">transforma vidas.</span>
          </h1>
          <p className="hero-in hero-in-3 mx-auto mt-3 max-w-[30ch] text-pretty text-lg leading-snug text-white sm:text-xl md:mx-0 md:mt-5 md:max-w-[34ch] md:text-2xl">
            Ajude <strong className="font-bold">{institution.childrenLabel}</strong> com as compras que você já faz.
          </p>

          <div className="hero-in hero-in-4 mt-6 flex flex-col items-center gap-3 md:mt-8 md:items-start lg:flex-row lg:items-center lg:gap-5">
            <a href="#ajudar" className="btn btn-sun min-h-14 w-full whitespace-nowrap px-9 text-lg sm:w-auto sm:min-h-16 sm:text-xl">
              Quero ajudar
              <ArrowDown size={22} strokeWidth={2.6} aria-hidden />
            </a>
            <p className="flex items-center gap-2 text-base font-semibold text-white sm:text-lg">
              <CircleCheck size={22} className="text-brand-amber" aria-hidden />
              Sem gastar nada a mais.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
