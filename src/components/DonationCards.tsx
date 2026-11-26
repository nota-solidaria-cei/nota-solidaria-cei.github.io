import { Heart, HeartHandshake, ReceiptText, Store } from 'lucide-react';
import { CampaignCard } from './CampaignCard';
import { Reveal } from './Reveal';
import type { PanelId } from '../hooks/usePanelRoute';

interface Props {
  onOpen: (panel: PanelId) => void;
}

const quickSteps = [
  'Entre na Nota Fiscal Paulista',
  'Abra Entidades › Doação automática',
  'Clique em Pesquisar e informe o CNPJ',
  'Confirme. Pronto!',
];

/** Resumo visual dos 4 passos, no card principal (desktop). */
function StepsPreview() {
  return (
    <span className="block rounded-3xl bg-[#12165C]/40 p-6 ring-1 ring-white/25 backdrop-blur-sm">
      <span className="mb-4 block text-sm font-bold uppercase tracking-wider text-white">Em 4 passos</span>
      <span className="flex flex-col gap-3">
        {quickSteps.map((s, i) => (
          <span key={s} className="flex items-center gap-3 text-lg font-semibold">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-base font-extrabold text-brand-deep">
              {i + 1}
            </span>
            {s}
          </span>
        ))}
      </span>
    </span>
  );
}

export function DonationCards({ onOpen }: Props) {
  return (
    <section id="ajudar" aria-labelledby="ajudar-title" className="mx-auto max-w-[1240px] px-4 pt-14 sm:px-8 md:pt-24">
      <Reveal className="mb-7 text-center md:mb-12">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-pink">Como ajudar</p>
        <h2 id="ajudar-title" className="mt-2 text-balance text-[2rem] font-extrabold leading-tight tracking-tight text-brand-deep sm:text-5xl">
          Como você quer ajudar?
        </h2>
        <p className="mx-auto mt-3 max-w-[40ch] text-lg text-ink-soft sm:text-xl">
          Escolha o jeito mais fácil para você. Todos ajudam.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 min-[400px]:grid-cols-2 md:gap-6">
        <Reveal className="min-[400px]:col-span-2">
          <CampaignCard
            featured
            tone="auto"
            icon={HeartHandshake}
            badge="A maneira mais fácil de ajudar"
            title="Doação automática"
            description="Cadastre uma vez e continue ajudando nas próximas compras com seu CPF."
            cta="Quero ativar minha doação →"
            onClick={() => onOpen('tutorial')}
            aside={<StepsPreview />}
          />
        </Reveal>

        <Reveal delay={80} className="flex">
          <CampaignCard
            tone="notes"
            icon={ReceiptText}
            title="Doe suas notas"
            description="Sem CPF na nota? Seu cupom ainda pode ajudar."
            cta="Saiba como →"
            onClick={() => onOpen('notas')}
          />
        </Reveal>

        <Reveal delay={160} className="flex">
          <CampaignCard
            tone="merchant"
            icon={Store}
            title="Tenho um comércio"
            description="Faça parte dessa corrente de solidariedade."
            cta="Quero participar →"
            onClick={() => onOpen('parceiro')}
          />
        </Reveal>

        <Reveal delay={120} className="min-[400px]:col-span-2">
          <CampaignCard
            compact
            tone="more"
            icon={Heart}
            title="Outras formas de ajudar"
            description="Você também pode contribuir diretamente com a instituição via Pix."
            cta="Ver opções →"
            onClick={() => onOpen('pix')}
          />
        </Reveal>
      </div>
    </section>
  );
}
