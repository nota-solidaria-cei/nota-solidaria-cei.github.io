import { useCallback, useEffect, useRef, useState } from 'react';

export type ClipboardStatus = 'idle' | 'copied' | 'error';

/** Copia texto. Usa a Clipboard API e cai para execCommand (páginas http, navegadores antigos). */
export async function writeToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard?.writeText && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      /* tenta o fallback */
    }
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.setAttribute('aria-hidden', 'true');
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;';
    // Dentro de um <dialog> modal o resto da página fica inerte; o campo precisa estar nele.
    const host = document.querySelector('dialog[open]') ?? document.body;
    host.appendChild(ta);
    ta.focus({ preventScroll: true });
    ta.select();
    ta.setSelectionRange(0, text.length);
    const ok = document.execCommand('copy');
    host.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export function useClipboard(resetAfterMs = 2400) {
  const [status, setStatus] = useState<ClipboardStatus>('idle');
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text: string) => {
      const ok = await writeToClipboard(text);
      setStatus(ok ? 'copied' : 'error');
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setStatus('idle'), resetAfterMs);
      return ok;
    },
    [resetAfterMs],
  );

  return { status, copied: status === 'copied', copy };
}
