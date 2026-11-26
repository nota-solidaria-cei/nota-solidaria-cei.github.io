import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Collapse } from './Collapse';
import { Reveal } from './Reveal';
import { faqItems } from '../config/campaign';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const uid = useId();

  return (
    <section aria-labelledby="faq-title" className="mx-auto mt-16 max-w-[900px] px-4 sm:px-8 md:mt-28">
      <Reveal className="mb-6 text-center md:mb-10">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-pink">Dúvidas</p>
        <h2 id="faq-title" className="mt-2 text-balance text-[2rem] font-extrabold leading-tight tracking-tight text-brand-deep sm:text-5xl">
          Perguntas frequentes
        </h2>
      </Reveal>

      <Reveal>
        <ul className="overflow-hidden rounded-3xl bg-white shadow-[0_12px_30px_rgba(32,56,107,0.08)] ring-1 ring-[#E3EAF7]">
          {faqItems.map((item, i) => {
            const open = openIndex === i;
            const btnId = `${uid}-b${i}`;
            const panelId = `${uid}-p${i}`;
            return (
              <li key={item.q} className="border-b border-[#E9EEF9] last:border-b-0">
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex min-h-16 w-full items-center justify-between gap-4 px-5 py-4 text-left text-[1.0625rem] font-bold leading-snug text-brand-deep transition-colors hover:bg-mist active:bg-mist sm:px-7 sm:text-xl"
                  >
                    <span>{item.q}</span>
                    <span
                      aria-hidden
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-300 ${open ? 'bg-brand-deep text-white' : 'bg-[#E8EEFC] text-brand-deep'}`}
                    >
                      <ChevronDown size={20} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                    </span>
                  </button>
                </h3>
                <Collapse open={open} id={panelId} labelledBy={btnId}>
                  <p className="px-5 pb-5 text-base leading-relaxed text-ink sm:px-7 sm:pb-6 sm:text-lg">{item.a}</p>
                </Collapse>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
