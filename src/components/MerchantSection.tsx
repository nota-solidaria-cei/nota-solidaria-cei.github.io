import type { ReactNode } from 'react';
import { Download, FileText, HeartHandshake, Info, Megaphone, MessageCircle, Package, Share2, type LucideIcon } from 'lucide-react';
import { Callout } from './ui';
import { SocialShareCard } from './SocialShare';
import { campaign } from '../config/campaign';
import { institution, whatsappLink } from '../config/institution';

const tints = {
  banner: 'bg-brand-amber/25 text-[#9A5B00]',
  urna: 'bg-[#FFE3DC] text-[#C2412D]',
  share: 'bg-brand-pink/10 text-brand-pink',
};

/** Card de ação do comércio: ícone, título, texto e, se houver, botões embaixo (alinhados ao fim do card). */
function ActionCard({ icon: Icon, title, tint, text, children }: { icon: LucideIcon; title: string; tint: string; text: string; children?: ReactNode }) {
  return (
    <li className="flex flex-col gap-4 rounded-2xl bg-mist p-4 ring-1 ring-[#E3EAF7]">
      <div className="flex items-start gap-4">
        <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${tint}`}>
          <Icon size={24} aria-hidden />
        </span>
        <div className="min-w-0 flex-1 pt-0.5">
          <h5 className="text-lg font-bold leading-snug text-ink">{title}</h5>
          <p className="mt-0.5 text-base leading-snug text-ink-soft">{text}</p>
        </div>
      </div>
      {children && <div className="mt-auto flex flex-col gap-2">{children}</div>}
    </li>
  );
}

/** Botão "CEI vai até você": abre o WhatsApp do CEI já com a mensagem preenchida (sem formulário). */
function CeiComesToYou() {
  return (
    <a
      href={whatsappLink(campaign.volunteerSpaceWhatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-outline min-h-12 w-full px-4 text-base"
    >
      <MessageCircle size={20} aria-hidden /> CEI vai até você
      <span className="sr-only">(abre o WhatsApp em nova aba)</span>
    </a>
  );
}

export function MerchantSection() {
  const materials = campaign.materials;
  return (
    <div className="flex flex-col gap-6 px-5 pb-8 pt-6 sm:px-8 sm:pb-10 sm:pt-8">
      <div>
        <h3 className="text-balance text-[1.7rem] font-extrabold leading-tight tracking-tight text-brand-deep sm:text-4xl">
          Seu comércio também pode transformar vidas.
        </h3>
        <p className="mt-3 text-lg leading-snug text-ink sm:text-xl">
          Ajude a divulgar uma forma simples de contribuir com {institution.childrenLabel} da nossa comunidade.
        </p>
      </div>

      <section aria-labelledby="como-participar">
        <h4 id="como-participar" className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-brand-pink">
          Como participar
        </h4>
        <ul className="grid gap-3 sm:grid-cols-2">
          <ActionCard icon={Megaphone} tint={tints.banner} title="Exponha um banner perto do caixa" text="Quem passa pela fila vê e pode ajudar na hora.">
            <a href={`./materials/${campaign.banner.file}`} download className="btn btn-primary min-h-12 w-full px-4 text-base">
              <Download size={20} aria-hidden /> Baixar banner
              <span className="sr-only">(imagem PNG)</span>
            </a>
            <a
              href={`./materials/${campaign.banner.pdf}`}
              download
              className="inline-flex min-h-11 items-center justify-center px-2 text-base font-semibold text-brand-deep underline decoration-brand-pink decoration-2 underline-offset-4"
            >
              Prefere imprimir? Baixe o PDF (A4)
            </a>
            <CeiComesToYou />
          </ActionCard>

          <ActionCard icon={Package} tint={tints.urna} title="Disponibilize uma urna" text="Nós entregamos uma urna para que os clientes disponibilizem as notas.">
            {/* Dica discreta: preenche o espaço do card sem competir com os botões */}
            <p className="flex items-start gap-2.5 rounded-xl bg-white px-3 py-2.5 text-sm leading-snug text-ink-soft ring-1 ring-[#E3EAF7]">
              <HeartHandshake size={18} className="mt-0.5 shrink-0 text-brand-purple" aria-hidden />
              <span>
                <strong className="font-semibold text-ink">Incentive seus clientes e amigos.</strong> Convide cada um a ativar a doação automática. É simples e não custa nada.
              </span>
            </p>
            <CeiComesToYou />
          </ActionCard>

          <SocialShareCard icon={Share2} tint={tints.share} title="Compartilhe nas redes sociais" text="Um post seu alcança a vizinhança toda." />
        </ul>
      </section>

      <Callout icon={Info} tone="sun">
        <strong>Você não precisa ter uma urna para participar.</strong> A simples divulgação do banner já ajuda. Se quiser uma urna, o CEI pode combinar com você a retirada das notas arrecadadas.
      </Callout>

      {materials.length > 0 && (
        <section aria-labelledby="materiais">
          <h4 id="materiais" className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-brand-pink">
            Materiais da campanha
          </h4>
          <ul className="grid gap-3 sm:grid-cols-2">
            {materials.map((m) => (
              <li key={m.file}>
                <a
                  href={`./materials/${m.file}`}
                  download
                  className="flex min-h-16 items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-[#CFD9F0] transition hover:ring-brand-deep active:scale-[0.98]"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#E8EEFC] text-brand-deep">
                    <FileText size={24} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-lg font-bold text-ink">{m.title}</span>
                    {m.description && <span className="block text-base text-ink-soft">{m.description}</span>}
                  </span>
                  <Download size={22} className="shrink-0 text-brand-deep" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="flex flex-col gap-2">
        <a
          href={whatsappLink(campaign.merchantWhatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn grad-sun min-h-16 w-full text-lg text-ink shadow-[0_10px_26px_rgba(255,170,32,0.45)] sm:w-auto sm:self-start sm:px-9"
        >
          <MessageCircle size={24} aria-hidden /> Quero ser um comércio parceiro
          <span className="sr-only">(abre o WhatsApp em nova aba)</span>
        </a>
        <p className="text-sm text-ink-soft">Sem formulário: a conversa é direto pelo WhatsApp do CEI, {institution.whatsapp.display}.</p>
      </div>
    </div>
  );
}
