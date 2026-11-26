import { useEffect, useId, useRef, useState } from 'react';
import { ArrowLeftRight, X } from 'lucide-react';
import { markNestedDialogClosed } from './Modal';
import { getShot, type Shot, type ShotName } from '../config/tutorialShots';

/** Imagem da tela do portal com os retângulos de destaque por cima (em %, acompanham o tamanho). */
function ShotImage({ shot }: { shot: Shot }) {
  return (
    <div className="relative">
      <img src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} decoding="async" className="block h-auto w-full" />
      {shot.marks.map((m, i) => (
        <span
          key={i}
          aria-hidden
          className="shot-mark"
          style={{
            left: `${(m.x / shot.w) * 100}%`,
            top: `${(m.y / shot.h) * 100}%`,
            width: `${(m.w / shot.w) * 100}%`,
            height: `${(m.h / shot.h) * 100}%`,
          }}
        />
      ))}
    </div>
  );
}

/** Tela ampliada: no celular mantém um tamanho legível e deixa deslizar para os lados. */
function Lightbox({ shot, open, onClose }: { shot: Shot; open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [overflowing, setOverflowing] = useState(false);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    const el = bodyRef.current;
    if (!open || !el) return;
    const check = () => setOverflowing(el.scrollWidth > el.clientWidth + 1);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open]);

  // largura: até 2x o tamanho original (sem borrar demais) e nunca menor que ~720px no celular
  const width = `min(${shot.w * 2}px, calc(100vw - 72px))`;
  const minWidth = Math.min(shot.w, 720);

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-labelledby={titleId}
      onCancel={(e) => {
        // fecha só esta ampliação; o ESC não deve continuar para o tutorial que está embaixo
        e.preventDefault();
        markNestedDialogClosed();
        ref.current?.close();
      }}
      onClose={() => {
        markNestedDialogClosed();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) ref.current?.close();
      }}
    >
      {open && (
        <>
          <div className="flex items-center justify-between gap-3 px-4 py-2.5 sm:px-5">
            <div className="min-w-0">
              <p id={titleId} className="text-base font-bold text-brand-deep">
                Tela do portal oficial
              </p>
              {overflowing && (
                <p className="flex items-center gap-1.5 text-sm text-ink-soft">
                  <ArrowLeftRight size={16} aria-hidden /> Deslize para os lados para ver a tela inteira
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label="Fechar tela ampliada"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#E8EEFC] text-brand-deep transition hover:bg-[#D8E2F8] active:scale-95"
            >
              <X size={22} aria-hidden />
            </button>
          </div>
          <div ref={bodyRef} className="lightbox-body">
            <div style={{ width, minWidth }}>
              <ShotImage shot={shot} />
            </div>
          </div>
        </>
      )}
    </dialog>
  );
}

/**
 * Captura real do portal dentro do passo a passo, com destaque no que clicar e o "olhinho"
 * (Ver tela maior). Se a captura não existir, não renderiza nada.
 */
export function PortalShot({ name }: { name: ShotName }) {
  const shot = getShot(name);
  const [open, setOpen] = useState(false);
  if (!shot) return null;

  return (
    <figure className="mt-3">
      {/* A própria imagem é o botão de ampliar (sem rótulo na tela); leitores de tela e teclado usam o mesmo botão. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label="Ampliar a tela do portal"
        className="block w-full cursor-zoom-in overflow-hidden rounded-2xl bg-white text-left ring-1 ring-[#CFD9F0] transition hover:ring-brand-deep"
        style={{ maxWidth: Math.round(shot.w * 1.4) }}
      >
        <ShotImage shot={shot} />
      </button>
      <Lightbox shot={shot} open={open} onClose={() => setOpen(false)} />
    </figure>
  );
}
