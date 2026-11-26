import { Check, Link2, MessageCircle, Share2 } from 'lucide-react';
import { Reveal } from './Reveal';
import { useClipboard } from '../hooks/useClipboard';
import { getPublicUrl, useShare } from '../hooks/useShare';

export function ShareCampaign() {
  const { canNativeShare, getWhatsappHref, nativeShare } = useShare();
  const { status, copy } = useClipboard();
  const copied = status === 'copied';

  return (
    <section aria-labelledby="share-title" className="mx-auto mt-16 max-w-[1240px] px-4 sm:px-8 md:mt-28">
      <Reveal>
        <div className="tone-share on-dark relative overflow-hidden rounded-[32px] px-6 py-10 text-center text-white sm:px-12 sm:py-16">
          <span aria-hidden className="absolute -left-16 -top-20 h-64 w-64 rounded-full bg-white/12" />
          <span aria-hidden className="absolute -bottom-24 -right-12 h-72 w-72 rounded-full bg-white/10" />
          <span aria-hidden className="absolute bottom-8 left-[14%] hidden h-14 w-14 rounded-full bg-brand-amber sm:block" />
          <span aria-hidden className="absolute right-[16%] top-8 hidden h-8 w-8 rounded-full bg-brand-cyan sm:block" />

          <div className="relative">
            <h2 id="share-title" className="text-balance text-[2.1rem] font-extrabold leading-tight tracking-tight sm:text-5xl">
              Solidariedade se multiplica.
            </h2>
            <p className="mx-auto mt-3 max-w-[34ch] text-lg text-white sm:text-2xl">Compartilhe essa ideia com quem você conhece.</p>

            <div className="mx-auto mt-7 flex max-w-[460px] flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
              <a href={getWhatsappHref()} target="_blank" rel="noopener noreferrer" className="btn btn-white min-h-14 sm:px-8">
                <MessageCircle size={22} aria-hidden /> Compartilhar no WhatsApp
                <span className="sr-only">(abre em nova aba)</span>
              </a>
              <button type="button" onClick={() => copy(getPublicUrl())} className="btn btn-outline-white min-h-14 sm:px-8">
                {copied ? <Check size={22} strokeWidth={2.8} aria-hidden /> : <Link2 size={22} aria-hidden />}
                {copied ? 'Link copiado!' : 'Copiar link'}
              </button>
              {canNativeShare && (
                <button type="button" onClick={nativeShare} className="btn btn-outline-white min-h-14 sm:px-8">
                  <Share2 size={22} aria-hidden /> Outros apps
                </button>
              )}
            </div>
            <span role="status" aria-live="polite" className="sr-only">
              {copied ? 'Link copiado' : ''}
            </span>
            {status === 'error' && (
              <p role="alert" className="mt-3 text-base font-semibold text-white">
                Não foi possível copiar automaticamente. O endereço desta página é {getPublicUrl()}
              </p>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
