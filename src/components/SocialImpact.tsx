import { Bus, HandHeart, Hammer, Palette, Puzzle } from 'lucide-react';
import { Reveal } from './Reveal';

const items = [
  { icon: Puzzle, title: 'Brincadeiras e descobertas', bg: 'from-[#00B7E9] to-[#0079D0]' },
  { icon: Palette, title: 'Materiais e experiências educativas', bg: 'from-[#7D3CFF] to-[#B238C9]' },
  { icon: Bus, title: 'Passeios e atividades recreativas', bg: 'from-[#FFAA20] to-[#FF6454]' },
  { icon: Hammer, title: 'Manutenção e melhorias dos espaços', bg: 'from-[#2747B5] to-[#365FD6]' },
];

export function SocialImpact() {
  return (
    <section aria-labelledby="impacto-title" className="mx-auto mt-16 max-w-[1240px] px-4 sm:px-8 md:mt-28">
      <div className="grid items-center gap-8 md:grid-cols-[1fr_1.05fr] md:gap-14">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-pink">Impacto</p>
          <h2 id="impacto-title" className="mt-2 text-balance text-[2rem] font-extrabold leading-tight tracking-tight text-brand-deep sm:text-5xl">
            O que sua nota ajuda a transformar?
          </h2>
          <p className="mt-4 max-w-[46ch] text-pretty text-lg leading-relaxed text-ink sm:text-xl">
            A arrecadação de notas fiscais ajuda a complementar os recursos da instituição e permite investir em melhorias, materiais e novas experiências para as crianças.
          </p>
          <div className="mt-6 flex gap-4 rounded-3xl bg-white p-5 shadow-[0_12px_30px_rgba(32,56,107,0.08)] ring-1 ring-[#E3EAF7]">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-pink/10 text-brand-pink">
              <HandHeart size={26} aria-hidden />
            </span>
            <p className="text-base leading-snug text-ink sm:text-lg">
              <strong>Quem faz esse trabalho?</strong> Os próprios funcionários, voluntariamente, coletam e processam as notas. A <strong>doação automática ajuda a reduzir esse trabalho</strong>.
            </p>
          </div>
        </Reveal>

        <ul className="grid grid-cols-2 gap-3 sm:gap-5">
          {items.map((it, i) => (
            <Reveal as="li" key={it.title} delay={i * 80}>
              <div className="flex h-full flex-col items-start gap-4 rounded-3xl bg-white p-4 shadow-[0_12px_30px_rgba(32,56,107,0.08)] ring-1 ring-[#E3EAF7] sm:p-6">
                <span className={`grid h-14 w-14 place-items-center rounded-2xl bg-linear-to-br text-white shadow-md sm:h-16 sm:w-16 ${it.bg}`}>
                  <it.icon size={28} aria-hidden />
                </span>
                <span className="text-[1.05rem] font-bold leading-snug text-brand-deep sm:text-xl">{it.title}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
