import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronRight, ExternalLink, ListChecks, ShieldCheck, Sparkles } from 'lucide-react';
import { CopyButton } from './CopyButton';
import { PortalShot } from './PortalShot';
import { institution } from '../config/institution';

const STEPS = [
  { title: 'Acesse o portal oficial', short: 'Portal' },
  { title: 'Encontre a doação automática', short: 'Menu' },
  { title: 'Pesquise nossa instituição', short: 'Pesquisar' },
  { title: 'Confirme e pronto!', short: 'Confirmar' },
];

function PortalLink({ children, variant = 'btn-primary', className = '' }: { children: ReactNode; variant?: string; className?: string }) {
  return (
    <a
      href={institution.nfp.portalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn ${variant} min-h-14 w-full sm:w-auto ${className}`}
    >
      {children}
      <ExternalLink size={20} aria-hidden />
      <span className="sr-only">(abre em nova aba)</span>
    </a>
  );
}

function Chip({ children, strong }: { children: ReactNode; strong?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-xl px-3.5 py-2 text-base font-bold ${
        strong ? 'bg-brand-deep text-white' : 'bg-[#E8EEFC] text-brand-deep'
      }`}
    >
      {children}
    </span>
  );
}

/** Ação numerada dentro de um passo (a, b, c). */
function Action({ letter, children }: { letter: string; children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span aria-hidden className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#E8EEFC] text-sm font-extrabold text-brand-deep">
        {letter}
      </span>
      <div className="min-w-0 flex-1 text-lg leading-snug text-ink">{children}</div>
    </li>
  );
}

// Itens conferidos na tela "Adesão à doação automática de documento fiscal com CPF" do portal oficial.
const goodToKnow = [
  'Você usa o seu próprio CPF nas compras.',
  'O CNPJ serve apenas para localizar a entidade. Não é digitado na nota.',
  'A doação passa a valer a partir do primeiro dia do mês seguinte ao cadastro.',
  'Para interromper a doação ou trocar de entidade, use o site ou o aplicativo oficial da Nota Fiscal Paulista.',
  'Esta página não coleta dados pessoais.',
  'Os créditos elegíveis são destinados à instituição.',
  'Não existe cobrança adicional na compra.',
  'Nem toda compra necessariamente gera créditos.',
];

function GoodToKnow() {
  return (
    <div className="rounded-2xl bg-[#EEF7FF] p-5 ring-1 ring-[#CFE6FA]">
      <p className="flex items-center gap-2 text-lg font-extrabold text-brand-deep">
        <ShieldCheck size={22} aria-hidden /> Bom saber
      </p>
      <ul className="mt-3 flex flex-col gap-2.5">
        {goodToKnow.map((t) => (
          <li key={t} className="flex gap-3 text-base leading-snug text-ink">
            <Check size={20} strokeWidth={3} className="mt-0.5 shrink-0 text-emerald-600" aria-hidden />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StepBody({ index }: { index: number }) {
  switch (index) {
    case 0:
      return (
        <div className="flex flex-col gap-4">
          <p className="text-lg leading-snug text-ink">
            Entre na Nota Fiscal Paulista usando a sua conta <strong>Gov.br</strong>.
          </p>
          <PortalLink>Acessar Nota Fiscal Paulista</PortalLink>
          <p className="text-base text-ink-soft">Abre em uma nova aba. Este passo a passo continua aqui, esperando por você.</p>
        </div>
      );
    case 1:
      return (
        <div className="flex flex-col gap-4">
          <p className="text-lg leading-snug text-ink">No menu <strong>Entidades</strong>, selecione:</p>
          <div className="flex flex-wrap items-center gap-2">
            <Chip>Entidades</Chip>
            <ChevronRight size={20} className="text-ink-soft" aria-hidden />
            <Chip strong>Doações de Cupons com CPF (automática)</Chip>
          </div>
          <PortalShot name="menu" />
          <p className="text-base text-ink-soft">
            Atenção: no mesmo menu existe também “Doação de Cupons <em>sem</em> CPF”. Escolha a opção <strong>com CPF (automática)</strong>.
          </p>
        </div>
      );
    case 2:
      return (
        <div className="flex flex-col gap-5">
          <ol aria-label="Como pesquisar a entidade" className="flex flex-col gap-5">
            <Action letter="a">
              Na tela de adesão, clique em <strong>Pesquisar</strong>, logo abaixo de “CNPJ Entidade”.
              <PortalShot name="adesao" />
            </Action>
            <Action letter="b">
              Em “Pesquisar Entidade”, deixe marcado <strong>Por CNPJ</strong> e informe o CNPJ da creche:
              <span className="mt-3 block rounded-2xl bg-mist p-4 ring-1 ring-[#D6E1F5] sm:p-5">
                <span className="block text-sm font-semibold uppercase tracking-wide text-ink-soft">CNPJ da instituição</span>
                <span className="mt-1 block select-all whitespace-nowrap text-[clamp(1.35rem,6.4vw,1.75rem)] font-extrabold tabular-nums tracking-wide text-brand-deep sm:text-4xl">
                  {institution.cnpj}
                </span>
                <span className="mt-4 flex flex-col gap-2">
                  <CopyButton value={institution.cnpjDigits} label="Copiar CNPJ" copiedLabel="CNPJ copiado!" className="w-full min-h-14 sm:w-auto sm:self-start" />
                </span>
              </span>
            </Action>
            <Action letter="c">
              Clique em <strong>Pesquisar</strong> de novo, selecione a entidade abaixo e clique em <strong>Avançar</strong>:
              <span className="mt-2 block rounded-2xl bg-[#FFF4DD] px-4 py-3 text-lg font-bold text-ink ring-1 ring-[#FFD98A]">
                {institution.nfpName}
              </span>
              <span className="mt-2 block text-base text-ink-soft">Razão social: {institution.legalName}.</span>
              <PortalShot name="pesquisa" />
            </Action>
          </ol>
          <p className="text-base text-ink-soft">
            Prefere não usar o CNPJ? A tela também permite buscar por <strong>Município / Razão Social / Área de Atuação</strong>: município{' '}
            <strong>{institution.nfp.municipality}</strong>, área <strong>{institution.nfp.category}</strong>.
          </p>
        </div>
      );
    default:
      return (
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-lg leading-snug text-ink">
              De volta à tela <strong>“Adesão à doação automática”</strong>, o campo <strong>CNPJ Entidade</strong> ganha um{' '}
              <strong>visto verde</strong> e aparecem a razão social (<strong>{institution.legalName}</strong>), a área de atuação e o município.
              O <strong>Período</strong> segue como <strong>Indeterminado</strong>: você não precisa renovar. Confira e clique em{' '}
              <strong>Confirmar Doação Automática</strong>.
            </p>
            <PortalShot name="confirmacao" />
          </div>
          <div>
            <p className="rounded-2xl bg-[#FFF4DD] px-4 py-3 text-base leading-snug text-ink ring-1 ring-[#FFD98A]">
              O portal mostra o aviso <strong>“Doação automática registrada.”</strong> Clique em <strong>Ok</strong> (ou aperte ESC) para fechar. A
              doação passa a valer a partir do <strong>primeiro dia do mês seguinte</strong>.
            </p>
            <PortalShot name="aviso" />
          </div>
          <div className="tone-auto on-dark relative overflow-hidden rounded-3xl p-6 text-white">
            <span aria-hidden className="absolute -bottom-12 -right-10 h-40 w-40 rounded-full bg-white/12" />
            <Sparkles size={26} aria-hidden className="text-brand-amber" />
            <p className="relative mt-2 text-balance text-2xl font-extrabold leading-tight sm:text-3xl">
              Um cadastro. Muitos pequenos gestos de solidariedade.
            </p>
            <p className="relative mt-2 text-lg text-white">
              Agora é só informar o seu próprio CPF nas próximas compras elegíveis.
            </p>
            <div className="relative mt-5">
              <PortalLink variant="btn-white">Acessar o portal oficial</PortalLink>
            </div>
          </div>
          <GoodToKnow />
        </div>
      );
  }
}

function StepCard({ index, children }: { index: number; children: ReactNode }) {
  return (
    <article>
      <div className="flex items-center gap-3 sm:gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-deep text-xl font-extrabold text-white sm:h-12 sm:w-12">
          {index + 1}
        </span>
        <h3 className="text-[1.3rem] font-extrabold leading-tight tracking-tight text-brand-deep sm:text-2xl">{STEPS[index].title}</h3>
      </div>
      {/* No celular o conteúdo usa a largura toda; do sm em diante, alinha com o título. */}
      <div className="mt-3 sm:pl-16">{children}</div>
    </article>
  );
}

export function DonationTutorial({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    contentRef.current?.closest('.sheet-body')?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step, showAll]);

  const last = step === STEPS.length - 1;
  const pct = ((step + 1) / STEPS.length) * 100;

  return (
    <div>
      <div className="px-5 pt-5 sm:px-8 sm:pt-7">
        <div className="flex items-center justify-between gap-3">
          <p className="text-base font-bold text-brand-deep" aria-live="polite">
            {showAll ? 'Todas as etapas' : `Passo ${step + 1} de ${STEPS.length}`}
          </p>
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-pressed={showAll}
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-base font-semibold text-brand-deep ring-1 ring-[#CFD9F0] transition active:scale-95 hover:bg-mist"
          >
            <ListChecks size={20} aria-hidden />
            {showAll ? 'Ver passo a passo' : 'Ver todas as etapas'}
          </button>
        </div>

        {!showAll && (
          <>
            <div
              role="progressbar"
              aria-label="Progresso do tutorial"
              aria-valuemin={1}
              aria-valuemax={STEPS.length}
              aria-valuenow={step + 1}
              aria-valuetext={`Passo ${step + 1} de ${STEPS.length}`}
              className="mt-4 h-2.5 overflow-hidden rounded-full bg-[#E3EAF7]"
            >
              <div
                className="h-full rounded-full bg-linear-to-r from-brand-cyan via-brand-deep to-brand-purple transition-[width] duration-500 ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>
            <ol className="mt-4 grid grid-cols-4 gap-1.5">
              {STEPS.map((s, i) => {
                const done = i < step;
                const current = i === step;
                return (
                  <li key={s.title}>
                    <button
                      type="button"
                      onClick={() => setStep(i)}
                      aria-current={current ? 'step' : undefined}
                      aria-label={`Ir para o passo ${i + 1}: ${s.title}`}
                      className={`flex min-h-14 w-full flex-col items-center justify-center gap-0.5 rounded-2xl px-1 py-1.5 text-center transition active:scale-95 ${
                        current ? 'bg-brand-deep text-white' : done ? 'bg-[#E8EEFC] text-brand-deep' : 'bg-mist text-ink-soft ring-1 ring-[#E3EAF7]'
                      }`}
                    >
                      <span className="flex items-center gap-1 text-base font-extrabold leading-none">
                        {done ? <Check size={16} strokeWidth={3.2} aria-hidden /> : null}
                        {i + 1}
                      </span>
                      <span className="text-[0.7rem] font-semibold leading-none sm:text-sm">{s.short}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </>
        )}
      </div>

      <div ref={contentRef} className="px-5 pb-6 pt-6 sm:px-8">
        {showAll ? (
          <div className="flex flex-col gap-9">
            {STEPS.map((_, i) => (
              <StepCard key={i} index={i}>
                <StepBody index={i} />
              </StepCard>
            ))}
          </div>
        ) : (
          <div key={step} className="step-in">
            <StepCard index={step}>
              <StepBody index={step} />
            </StepCard>
          </div>
        )}
      </div>

      {!showAll && (
        <div className="sheet-sticky-footer px-5 pt-4 sm:px-8">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="btn btn-outline min-h-14 flex-1 sm:flex-none sm:px-8"
            >
              <ArrowLeft size={20} aria-hidden /> Voltar
            </button>
            <button
              type="button"
              onClick={() => (last ? onClose() : setStep((s) => s + 1))}
              className="btn btn-primary min-h-14 flex-[1.6] sm:flex-none sm:px-10"
            >
              {last ? (
                <>
                  Concluir <Check size={20} strokeWidth={2.8} aria-hidden />
                </>
              ) : (
                <>
                  Avançar <ArrowRight size={20} aria-hidden />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
