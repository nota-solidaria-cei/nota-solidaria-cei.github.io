import { useEffect, useId, useState } from 'react';
import { Check, ChevronDown, Copy, Download, MessageCircle, Share2 } from 'lucide-react';
import { Collapse } from './Collapse';
import { FacebookIcon, InstagramIcon } from './ui';
import { campaign } from '../config/campaign';
import { useClipboard } from '../hooks/useClipboard';
import { getPublicUrl } from '../hooks/useShare';

const imageHref = `./materials/${campaign.promoImage.file}`;
const caption = () => `${campaign.socialCaption} ${getPublicUrl()}`;

/**
 * Celular ou tablet. O Chrome do Windows também aceita compartilhar arquivos, mas lá a janela do sistema
 * não lista o Instagram: no computador o caminho certo é baixar a imagem e abrir o Instagram.
 */
function isMobileDevice() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

/** O clique programático precisa acontecer dentro do <dialog> aberto (o resto da página fica inerte). */
function downloadImage() {
  const a = document.createElement('a');
  a.href = imageHref;
  a.download = campaign.promoImage.file;
  (document.querySelector('dialog[open]') ?? document.body).appendChild(a);
  a.click();
  a.remove();
}

/**
 * Card "Compartilhe nas redes sociais": abre as opções para divulgar de verdade a imagem da campanha.
 *  - WhatsApp e Facebook: abrem a tela de compartilhamento deles com a mensagem e o link da página.
 *  - Instagram: não existe link de publicação para sites. No celular abre a lista de apps com a imagem
 *    pronta; no computador baixa a imagem, copia a legenda e abre o Instagram.
 */
export function SocialShareCard({ icon: Icon, title, text, tint }: { icon: typeof Share2; title: string; text: string; tint: string }) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [canShareFile, setCanShareFile] = useState(false);
  const [note, setNote] = useState('');
  const { copy, status } = useClipboard();
  const panelId = useId();
  const buttonId = useId();

  // Carrega a imagem só quando o card abre, para o compartilhamento nativo (que exige o arquivo pronto).
  useEffect(() => {
    if (!open || file) return;
    let alive = true;
    fetch(imageHref)
      .then((r) => (r.ok ? r.blob() : Promise.reject(new Error('imagem não encontrada'))))
      .then((blob) => {
        if (!alive) return;
        const f = new File([blob], campaign.promoImage.file, { type: blob.type || 'image/png' });
        setFile(f);
        setCanShareFile(typeof navigator.canShare === 'function' && navigator.canShare({ files: [f] }));
      })
      .catch(() => {
        /* sem a imagem, os outros botões continuam funcionando */
      });
    return () => {
      alive = false;
    };
  }, [open, file]);

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(caption())}`;
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getPublicUrl())}`;

  const shareFile = async () => {
    if (!file) return;
    try {
      await navigator.share({ files: [file], text: caption(), title: campaign.pageTitle });
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setNote('Não foi possível abrir o compartilhamento. Use “Baixar imagem”.');
    }
  };

  const instagram = async () => {
    // O Instagram não recebe texto por link: a legenda vai para a área de transferência em qualquer caminho.
    void copy(caption());
    if (canShareFile && isMobileDevice()) {
      setNote('Legenda copiada. Escolha o Instagram na lista e cole a legenda na publicação.');
      await shareFile();
      return;
    }
    downloadImage();
    window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
    setNote('Imagem baixada e legenda copiada. No Instagram, crie uma publicação, escolha a imagem e cole a legenda.');
  };

  return (
    <li className="overflow-hidden rounded-2xl bg-mist ring-1 ring-[#E3EAF7] sm:col-span-2">
      <button
        id={buttonId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start gap-4 p-4 text-left transition hover:bg-[#F1F5FD]"
      >
        <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${tint}`}>
          <Icon size={24} aria-hidden />
        </span>
        <span className="min-w-0 flex-1 pt-0.5">
          <span className="block text-lg font-bold leading-snug text-ink">{title}</span>
          <span className="mt-0.5 block text-base leading-snug text-ink-soft">{text}</span>
          <span className="mt-1.5 block text-base font-semibold text-brand-deep">{open ? 'Fechar opções' : 'Ver opções para divulgar'}</span>
        </span>
        <ChevronDown size={24} aria-hidden className={`mt-3 shrink-0 text-brand-deep transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      <Collapse open={open} id={panelId} labelledBy={buttonId}>
        <div className="grid gap-5 px-4 pb-5 pt-1 sm:grid-cols-[200px_1fr] sm:gap-6">
          <img
            src={imageHref}
            alt={campaign.promoImage.alt}
            width={1080}
            height={1350}
            loading="lazy"
            decoding="async"
            className="mx-auto w-full max-w-[220px] rounded-2xl shadow-[0_10px_26px_rgba(32,56,107,0.18)] ring-1 ring-[#CFD9F0] sm:max-w-none"
          />
          <div className="flex min-w-0 flex-col gap-3">
            <p className="text-lg font-bold text-ink">Escolha onde divulgar:</p>
            <div className="grid gap-2 sm:grid-cols-3">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary min-h-12 px-4 text-base">
                <MessageCircle size={20} aria-hidden /> WhatsApp
                <span className="sr-only">(abre em nova aba)</span>
              </a>
              <button type="button" onClick={instagram} className="btn btn-primary min-h-12 px-4 text-base">
                <InstagramIcon size={20} /> Instagram
              </button>
              <a href={facebookHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary min-h-12 px-4 text-base">
                <FacebookIcon size={20} /> Facebook
                <span className="sr-only">(abre em nova aba)</span>
              </a>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <a href={imageHref} download={campaign.promoImage.file} className="btn btn-outline min-h-12 px-4 text-base">
                <Download size={20} aria-hidden /> Baixar imagem
              </a>
              <button type="button" onClick={() => copy(caption())} className="btn btn-outline min-h-12 px-4 text-base">
                {status === 'copied' ? <Check size={20} strokeWidth={2.8} aria-hidden /> : <Copy size={20} aria-hidden />}
                {status === 'copied' ? 'Legenda copiada!' : 'Copiar legenda'}
              </button>
              {canShareFile && (
                <button type="button" onClick={shareFile} className="btn btn-outline min-h-12 px-4 text-base sm:col-span-2">
                  <Share2 size={20} aria-hidden /> Enviar a imagem por outros apps
                </button>
              )}
            </div>

            <p role="status" aria-live="polite" className="min-h-6 text-base font-semibold text-brand-deep">
              {note}
            </p>
            <p className="text-sm leading-snug text-ink-soft">
              No WhatsApp e no Facebook, vai a mensagem com o link da campanha. O Instagram não permite publicar direto por um site: no celular abrimos a lista de apps
              com a imagem pronta; no computador baixamos a imagem e copiamos a legenda para você colar.
            </p>
          </div>
        </div>
      </Collapse>
    </li>
  );
}
