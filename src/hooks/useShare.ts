import { useCallback } from 'react';
import { campaign } from '../config/campaign';

/** URL pública da página (a que vai nos QR Codes). Nunca inclui hash ou parâmetros. */
export function getPublicUrl(): string {
  const configured = import.meta.env.VITE_SITE_URL as string | undefined;
  if (configured) return configured.replace(/\/?$/, '/');
  return `${window.location.origin}${window.location.pathname}`;
}

export function useShare() {
  const canNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  const getWhatsappHref = useCallback(
    () => `https://wa.me/?text=${encodeURIComponent(`${campaign.shareMessage} ${getPublicUrl()}`)}`,
    [],
  );

  /** Web Share API; se falhar por motivo diferente de cancelamento, cai para o WhatsApp. */
  const nativeShare = useCallback(async () => {
    try {
      await navigator.share({
        title: campaign.pageTitle,
        text: campaign.shareMessage,
        url: getPublicUrl(),
      });
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      window.open(getWhatsappHref(), '_blank', 'noopener,noreferrer');
    }
  }, [getWhatsappHref]);

  return { canNativeShare, getWhatsappHref, nativeShare };
}
