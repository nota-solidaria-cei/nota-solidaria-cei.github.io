import { HeartHandshake, TriangleAlert } from 'lucide-react';
import { Callout } from './ui';
import { CopyButton } from './CopyButton';
import { institution } from '../config/institution';

export function PixDonation({ onOpenTutorial }: { onOpenTutorial: () => void }) {
  return (
    <div className="flex flex-col gap-6 px-5 pb-8 pt-6 sm:px-8 sm:pb-10 sm:pt-8">
      <div>
        <h3 className="text-balance text-[1.7rem] font-extrabold leading-tight tracking-tight text-brand-deep sm:text-4xl">
          Quer ajudar de outra forma?
        </h3>
        <p className="mt-3 text-lg leading-snug text-ink sm:text-xl">
          Você também pode fazer uma doação diretamente à instituição via Pix.
        </p>
      </div>

      <div className="rounded-3xl bg-mist p-5 ring-1 ring-[#D6E1F5] sm:p-6">
        <dl className="flex flex-col gap-4">
          <div>
            <dt className="text-sm font-semibold uppercase tracking-wide text-ink-soft">Chave Pix (CNPJ)</dt>
            <dd className="mt-1 select-all whitespace-nowrap text-[clamp(1.35rem,6.4vw,1.75rem)] font-extrabold tabular-nums tracking-wide text-brand-deep sm:text-4xl">
              {institution.pix.key}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold uppercase tracking-wide text-ink-soft">Beneficiário</dt>
            <dd className="mt-1 text-xl font-bold text-ink">{institution.pix.beneficiary}</dd>
          </div>
        </dl>
        <div className="mt-5 flex flex-col gap-2">
          <CopyButton
            value={institution.pix.keyToCopy}
            label="Copiar chave Pix"
            copiedLabel="Chave Pix copiada!"
            className="w-full min-h-14 sm:w-auto sm:self-start"
          />
        </div>
      </div>

      <Callout icon={TriangleAlert} tone="sun">
        <strong>Confira antes de concluir:</strong> no seu aplicativo do banco, o beneficiário deve aparecer como <strong>{institution.pix.beneficiary}</strong>.
      </Callout>

      <div className="flex flex-col gap-3 rounded-2xl bg-[#EEF7FF] p-5 ring-1 ring-[#CFE6FA] sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-3 text-base leading-snug text-ink sm:text-lg">
          <HeartHandshake size={24} className="mt-0.5 shrink-0 text-brand-deep" aria-hidden />
          Prefere ajudar sem gastar nada a mais? Conheça a doação automática.
        </p>
        <button type="button" onClick={onOpenTutorial} className="btn btn-soft min-h-12 shrink-0">
          Ver como ativar
        </button>
      </div>
    </div>
  );
}
