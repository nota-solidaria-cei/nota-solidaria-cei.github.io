import { Baby, CalendarHeart, Users } from 'lucide-react';

const stats = [
  {
    icon: Users,
    tint: 'bg-brand-cyan/12 text-brand-cyan',
    pre: '',
    main: '+160',
    post: '',
    label: 'Crianças atendidas',
  },
  {
    icon: CalendarHeart,
    tint: 'bg-brand-pink/10 text-brand-pink',
    pre: 'Desde',
    main: '1988',
    post: '',
    label: 'Cuidando de vidas',
  },
  {
    icon: Baby,
    tint: 'bg-brand-amber/20 text-[#B86E00]',
    pre: '',
    main: '0 a 5',
    post: 'anos',
    label: 'Educação infantil',
  },
];

/** Faixa branca de indicadores, sobreposta à base do hero. */
export function ImpactStats() {
  return (
    <section aria-label="A instituição em números" className="relative z-10 -mt-12 px-4 sm:px-8 md:-mt-16">
      <ul className="mx-auto grid max-w-[1000px] grid-cols-3 divide-x divide-[#E3EAF7] rounded-3xl bg-white px-1 py-4 shadow-[0_18px_50px_rgba(32,56,107,0.16)] sm:py-7 md:px-6">
        {stats.map((s) => (
          <li key={s.label} className="flex flex-col items-center justify-center gap-0.5 px-1.5 text-center sm:gap-1 sm:px-2 lg:flex-row lg:gap-5 lg:px-4 lg:text-left">
            <span aria-hidden className={`mb-1 hidden h-14 w-14 shrink-0 place-items-center rounded-full sm:grid lg:mb-0 ${s.tint}`}>
              <s.icon size={26} />
            </span>
            <span className="flex flex-col items-center lg:items-start">
              <span className="flex items-baseline gap-1 whitespace-nowrap text-brand-deep">
                {s.pre && <span className="text-[0.7rem] font-semibold uppercase leading-none tracking-wide text-ink-soft sm:text-sm sm:normal-case sm:tracking-normal">{s.pre}</span>}
                <span className="text-[clamp(1.375rem,6.4vw,2rem)] font-extrabold leading-none tracking-tight sm:text-[2rem] lg:text-[2.5rem]">{s.main}</span>
                {s.post && <span className="text-[0.7rem] font-semibold leading-none text-ink-soft sm:text-base">{s.post}</span>}
              </span>
              <span className="mt-1 text-[0.72rem] font-medium leading-tight text-ink-soft sm:text-base lg:mt-1.5">{s.label}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
