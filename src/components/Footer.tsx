import { ExternalLink, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { CampaignLogo } from './CampaignLogo';
import { GithubIcon, InstagramIcon } from './ui';
import { campaign } from '../config/campaign';
import { institution } from '../config/institution';

/** Usuário do GitHub tirado do link (ex.: https://github.com/usuario -> "usuario"). */
const developerHandle = campaign.developer.githubUrl.replace(/\/+$/, '').split('/').pop() ?? '';

const linkCls ='inline-flex min-h-11 items-center gap-2.5 rounded-lg py-1.5 text-base text-white underline-offset-4 hover:underline';

export function Footer() {
  return (
    <footer id="contato" className="on-dark mt-20 bg-[#16255A] text-white md:mt-32">
      {/* faixa nas cores da campanha */}
      <div aria-hidden className="h-1.5 w-full bg-linear-to-r from-brand-cyan via-brand-purple via-45% to-brand-pink" />

      <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.1fr_1fr_1fr] md:py-16">
        <div>
          <CampaignLogo variant="light" />
          <p className="mt-5 text-xl font-bold">{institution.legalName}</p>
          <p className="mt-1 text-base text-white/90">CNPJ: {institution.cnpj}</p>
          <p className="mt-4 flex items-start gap-2.5 text-base leading-snug text-white/95">
            <MapPin size={20} className="mt-0.5 shrink-0" aria-hidden />
            <span>
              {institution.addressLine}
              <br />
              CEP: {institution.address.zip}
            </span>
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-brand-amber">Contato</h2>
          <ul className="mt-3 flex flex-col">
            <li>
              <a href={institution.phones.primary.href} className={linkCls}>
                <Phone size={20} aria-hidden /> Telefone: {institution.phones.primary.display}
              </a>
            </li>
            <li>
              <a href={institution.phones.secondary.href} className={linkCls}>
                <Phone size={20} aria-hidden /> Telefone secundário: {institution.phones.secondary.display}
              </a>
            </li>
            <li>
              <a href={institution.whatsapp.url} target="_blank" rel="noopener noreferrer" className={linkCls}>
                <MessageCircle size={20} aria-hidden /> WhatsApp: {institution.whatsapp.display}
                <span className="sr-only">(abre em nova aba)</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${institution.email}`} className={`${linkCls} break-all`}>
                <Mail size={20} className="shrink-0" aria-hidden /> E-mail: {institution.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-brand-amber">Na internet</h2>
          <ul className="mt-3 flex flex-col">
            <li>
              <a href={institution.instagram.url} target="_blank" rel="noopener noreferrer" className={linkCls}>
                <InstagramIcon size={20} /> Instagram {institution.instagram.handle}
                <span className="sr-only">(abre em nova aba)</span>
              </a>
            </li>
            <li>
              <a href={institution.nfp.portalUrl} target="_blank" rel="noopener noreferrer" className={linkCls}>
                <ExternalLink size={20} aria-hidden /> Portal oficial da Nota Fiscal Paulista
                <span className="sr-only">(abre em nova aba)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-4 px-5 py-6 text-base leading-snug text-white sm:px-8 md:flex-row md:items-center md:justify-between md:gap-8">
          <div className="flex flex-col gap-1.5">
            <p className="font-semibold">Campanha de divulgação solidária desenvolvida de forma voluntária.</p>
            {campaign.developerForm.url && (
              <p className="max-w-[62ch] text-white/90">
                Se você deseja que a sua ação solidária tenha uma página como esta, sem custo, entre em contato com a desenvolvedora pelo formulário.
              </p>
            )}
          </div>
          {campaign.developerForm.url && (
            <a
              href={campaign.developerForm.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-white min-h-12 shrink-0 whitespace-nowrap px-6 text-base"
            >
              <ExternalLink size={20} aria-hidden /> Acessar o formulário
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          )}
        </div>
      </div>

      {campaign.developer.githubUrl && (
        <div className="border-t border-white/10">
          <p className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-x-2 px-5 py-3 text-base text-white sm:px-8">
            Desenvolvido por
            <a
              href={campaign.developer.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4 hover:text-brand-amber"
            >
              <GithubIcon size={20} /> {campaign.developer.label || developerHandle}
              <span className="sr-only">(abre o GitHub em nova aba)</span>
            </a>
          </p>
        </div>
      )}
    </footer>
  );
}
