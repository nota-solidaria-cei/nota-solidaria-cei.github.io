import { useCallback, useEffect, useState } from 'react';

export type PanelId = 'tutorial' | 'notas' | 'parceiro' | 'pix';

const PANELS: PanelId[] = ['tutorial', 'notas', 'parceiro', 'pix'];

function fromHash(): PanelId | null {
  const id = window.location.hash.replace('#', '') as PanelId;
  return PANELS.includes(id) ? id : null;
}

/**
 * Controla qual painel (modal) está aberto e o mantém sincronizado com o hash da URL.
 * Assim dá para compartilhar/imprimir links diretos, ex.: …/#parceiro (QR Code para comerciantes).
 */
export function usePanelRoute() {
  const [panel, setPanel] = useState<PanelId | null>(() => fromHash());

  useEffect(() => {
    const onHash = () => setPanel(fromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const open = useCallback((id: PanelId) => {
    window.history.replaceState(null, '', `#${id}`);
    setPanel(id);
  }, []);

  const close = useCallback(() => {
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
    setPanel(null);
  }, []);

  return { panel, open, close };
}
