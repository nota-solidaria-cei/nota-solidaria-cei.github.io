import { useEffect, useId, useRef, type ReactNode } from 'react';
import { X, type LucideIcon } from 'lucide-react';

export type Tone = 'auto' | 'notes' | 'merchant' | 'more';

/**
 * Diálogo dentro de diálogo (ex.: tela ampliada dentro do tutorial). Dependendo do navegador, um único ESC
 * é entregue aos dois <dialog>. Quem fecha o diálogo de dentro chama isto, e o de fora ignora o ESC
 * que chega logo em seguida.
 */
let nestedClosedAt = 0;
export function markNestedDialogClosed() {
  nestedClosedAt = performance.now();
}

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  tone: Tone;
  /** Muda quando o conteúdo troca (volta o scroll ao topo). */
  contentKey?: string;
  children: ReactNode;
}

/**
 * Modal acessível baseado em <dialog>: foco preso, ESC fecha, fundo inerte, foco volta ao botão de origem.
 * No celular vira bottom sheet; no desktop, janela centralizada.
 */
export function Modal({ open, onClose, title, subtitle, icon: Icon, tone, contentKey, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.classList.add('modal-open');
    } else if (!open && dialog.open) {
      dialog.close();
    }
    if (!open) document.documentElement.classList.remove('modal-open');
  }, [open]);

  useEffect(() => () => document.documentElement.classList.remove('modal-open'), []);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, [contentKey]);

  return (
    <dialog
      ref={ref}
      className="sheet"
      aria-labelledby={titleId}
      onCancel={(e) => {
        e.preventDefault();
        if (performance.now() - nestedClosedAt < 300) return; // o mesmo ESC acabou de fechar um diálogo interno
        onClose();
      }}
      onClick={(e) => {
        // clique no fundo escurecido (o alvo é o próprio <dialog>)
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {open && (
        <div className="sheet-panel">
          <header className={`tone-${tone} on-dark relative shrink-0 overflow-hidden px-5 pb-5 pt-4 text-white sm:px-8 sm:pb-6 sm:pt-6`}>
            <span aria-hidden className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-white/15" />
            <span aria-hidden className="absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-white/10" />
            {/* alça visual do bottom sheet */}
            <span aria-hidden className="mx-auto mb-3 block h-1.5 w-11 rounded-full bg-white/50 md:hidden" />
            <div className="relative flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/20 ring-1 ring-white/30 sm:h-14 sm:w-14">
                <Icon size={26} aria-hidden />
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <h2 id={titleId} className="text-balance text-[1.4rem] font-extrabold leading-tight tracking-tight sm:text-3xl">
                  {title}
                </h2>
                {subtitle && <p className="mt-1 hidden text-lg text-white sm:block">{subtitle}</p>}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/20 text-white transition hover:bg-white/30 active:scale-95"
              >
                <X size={22} aria-hidden />
              </button>
            </div>
          </header>
          <div ref={bodyRef} className="sheet-body">
            {children}
          </div>
        </div>
      )}
    </dialog>
  );
}
