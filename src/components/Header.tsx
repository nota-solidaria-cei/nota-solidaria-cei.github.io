import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { CampaignLogo } from './CampaignLogo';

const links = [
  { label: 'Sobre nós', href: '#sobre' },
  { label: 'Como ajudar', href: '#ajudar' },
  // #parceiro abre o painel para comerciantes (ver usePanelRoute)
  { label: 'Seja parceiro', href: '#parceiro' },
  { label: 'Contato', href: '#contato' },
];

/** Header integrado ao hero: transparente sobre o degradê. */
export function Header() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  return (
    <header className="on-dark relative z-30 bg-linear-to-b from-[#0A2D7D]/78 via-[#0A2D7D]/60 to-transparent">
      <div ref={wrapRef} className="mx-auto flex max-w-[1240px] items-center justify-between px-4 py-3.5 sm:px-8 sm:py-6">
        <a href="#topo" aria-label="Nota Solidária — CEI Madre Teresa de Calcutá, início" className="rounded-xl">
          <CampaignLogo variant="light" />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="whitespace-nowrap rounded-full px-4 py-2.5 text-[1.0625rem] font-medium text-white/95 transition hover:bg-white/15 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="grid h-12 w-12 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/25 transition active:scale-95 lg:hidden"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} aria-hidden /> : <Menu size={26} aria-hidden />}
        </button>

        {open && (
          <nav
            id="menu-mobile"
            aria-label="Principal"
            className="step-in absolute inset-x-4 top-[calc(100%-4px)] z-40 rounded-3xl bg-white p-3 text-ink shadow-[0_24px_60px_rgba(10,25,70,0.35)] lg:hidden"
          >
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-14 items-center rounded-2xl px-4 text-lg font-semibold text-brand-deep active:bg-mist"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
