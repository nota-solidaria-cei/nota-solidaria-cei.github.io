import { Building2, Church, Clock, HeartHandshake, MapPin, MessageCircle, Send, Store, Copy } from 'lucide-react';
import { Callout, IconRow } from './ui';
import { campaign } from '../config/campaign';
import { institution, whatsappLink } from '../config/institution';

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${institution.address.street}, ${institution.address.district}, ${institution.address.city} - ${institution.address.state}, ${institution.address.zip}`,
)}`;

export function PhysicalDonation({ onOpenTutorial }: { onOpenTutorial: () => void }) {
  return (
    <div className="flex flex-col gap-6 px-5 pb-8 pt-6 sm:px-8 sm:pb-10 sm:pt-8">
      <div>
        <h3 className="text-balance text-[1.7rem] font-extrabold leading-tight tracking-tight text-brand-deep sm:text-4xl">
          Não colocou CPF na nota? Ela ainda pode ajudar.
        </h3>
        <p className="mt-3 text-lg leading-snug text-ink sm:text-xl">
          Você pode entregar para a instituição as notas e os cupons fiscais que ficaram sem CPF.
        </p>
      </div>

      <section aria-labelledby="onde-entregar">
        <h4 id="onde-entregar" className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-brand-pink">
          Onde entregar
        </h4>
        <ul className="grid gap-3 sm:grid-cols-2">
          <IconRow icon={Building2} title="Na própria instituição" tint="bg-brand-cyan/15 text-[#0B6E99]">
            {institution.addressLine}
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 font-semibold text-brand-deep underline underline-offset-2">
              <MapPin size={16} aria-hidden /> Ver no mapa
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          </IconRow>
          <IconRow icon={Church} title="Na urna da Paróquia" tint="bg-brand-purple/12 text-brand-purple">
            Paróquia Nossa Senhora do Belo Ramo.
          </IconRow>
          <IconRow icon={Send} title="Pelos Correios" tint="bg-brand-pink/10 text-brand-pink">
            {institution.addressLine} · CEP {institution.address.zip}
          </IconRow>
          <IconRow icon={Store} title="Em comércios participantes" tint="bg-brand-amber/25 text-[#9A5B00]">
            Procure as urnas nos estabelecimentos que apoiam a campanha.
          </IconRow>
        </ul>
      </section>

      <Callout icon={Copy} tone="sky">
        <strong>Precisa guardar a nota</strong> (garantia, conferência)? Faça uma cópia e envie a cópia para a creche.
      </Callout>

      <Callout icon={Clock} tone="sun">
        <strong>Entregue o quanto antes.</strong> Segundo o portal oficial da Nota Fiscal Paulista, a doação de notas sem CPF pode ser feita até o dia 20 do mês seguinte ao da emissão.
      </Callout>

      <div className="tone-auto on-dark relative overflow-hidden rounded-3xl p-6 text-white">
        <span aria-hidden className="absolute -bottom-12 -right-10 h-40 w-40 rounded-full bg-white/12" />
        <p className="relative flex items-center gap-2 text-xl font-extrabold">
          <HeartHandshake size={24} aria-hidden /> Prefere ajudar sem papel?
        </p>
        <p className="relative mt-2 text-base leading-snug text-white sm:text-lg">
          Com a <strong>doação automática</strong> é diferente das notas sem CPF: você informa o seu CPF nas compras e a equipe do CEI não precisa coletar nem processar suas notas.
        </p>
        <button type="button" onClick={onOpenTutorial} className="btn btn-white relative mt-4 min-h-14 w-full sm:w-auto">
          Ver como ativar
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <a
          href={whatsappLink(campaign.notesWhatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary min-h-14 w-full sm:w-auto sm:self-start"
        >
          <MessageCircle size={22} aria-hidden /> Tirar dúvidas no WhatsApp
          <span className="sr-only">(abre em nova aba)</span>
        </a>
        <p className="text-sm text-ink-soft">WhatsApp do CEI: {institution.whatsapp.display}</p>
      </div>
    </div>
  );
}
