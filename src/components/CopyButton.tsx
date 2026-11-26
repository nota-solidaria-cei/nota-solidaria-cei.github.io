import { Check, Copy } from 'lucide-react';
import { useClipboard } from '../hooks/useClipboard';

interface Props {
  /** Valor que vai para a área de transferência. */
  value: string;
  label: string;
  copiedLabel: string;
  className?: string;
}

export function CopyButton({ value, label, copiedLabel, className = '' }: Props) {
  const { status, copy } = useClipboard();
  const copied = status === 'copied';
  const failed = status === 'error';

  return (
    <>
      <button
        type="button"
        onClick={() => copy(value)}
        className={`btn ${copied ? 'bg-emerald-600 text-white' : 'btn-primary'} ${className}`}
      >
        {copied ? <Check size={20} strokeWidth={2.6} aria-hidden /> : <Copy size={20} aria-hidden />}
        <span>{copied ? copiedLabel : label}</span>
      </button>
      {/* Anunciado por leitores de tela; também mostra falha de forma honesta. */}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? copiedLabel : ''}
      </span>
      {failed && (
        <span role="alert" className="text-sm font-medium text-red-700">
          Não foi possível copiar. Selecione o número e copie manualmente.
        </span>
      )}
    </>
  );
}
