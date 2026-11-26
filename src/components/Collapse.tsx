import type { ReactNode } from 'react';

interface Props {
  open: boolean;
  id: string;
  children: ReactNode;
  labelledBy?: string;
}

/** Área expansível com transição suave de altura (grid 0fr → 1fr). */
export function Collapse({ open, id, children, labelledBy }: Props) {
  return (
    <div id={id} role="region" aria-labelledby={labelledBy} className="expand" data-open={open}>
      <div className="expand-inner" inert={!open}>
        {children}
      </div>
    </div>
  );
}
