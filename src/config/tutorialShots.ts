/**
 * Capturas reais do portal da Nota Fiscal Paulista usadas no passo a passo.
 *
 * Fluxo: salve as capturas (PNG) em originals/portal/ como "01-menu.png", "02-adesao.png"... e rode
 * `npm run portal`. O script gera os WebP em src/assets/tutorial/ e as dimensões em shots.json.
 * Uma captura que não existir simplesmente não aparece no tutorial (nenhuma imagem quebrada).
 *
 * PRIVACIDADE: nunca use capturas em que apareçam CPF, nome, e-mail, telefone ou saldo de alguém.
 *
 * Os destaques (`marks`) estão em PIXELS da imagem já processada (src/assets/tutorial/*.webp)
 * e viram porcentagens na tela, então acompanham qualquer tamanho.
 */
import shotsMeta from '../assets/tutorial/shots.json';

const files = import.meta.glob('../assets/tutorial/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const dims = shotsMeta as Record<string, { w: number; h: number }>;

export type ShotName = 'menu' | 'adesao' | 'pesquisa' | 'confirmacao' | 'aviso';

/** Retângulo destacado, em pixels da imagem processada. */
export interface Mark {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Shot {
  name: ShotName;
  src: string;
  w: number;
  h: number;
  alt: string;
  marks: Mark[];
}

const DEFS: Record<ShotName, { alt: string; marks: Mark[] }> = {
  menu: {
    alt: 'Menu do portal da Nota Fiscal Paulista. Em Entidades, a opção “Doações de Cupons com CPF (automática)” está em destaque, abaixo de “Doação de Cupons sem CPF”.',
    marks: [{ x: 7, y: 56, w: 206, h: 40 }],
  },
  adesao: {
    alt: 'Tela “Adesão à doação automática de documento fiscal com CPF”. O período aparece como Indeterminado e o botão Pesquisar, abaixo do campo CNPJ Entidade, está em destaque.',
    marks: [{ x: 66, y: 250, w: 70, h: 26 }],
  },
  pesquisa: {
    alt: 'Tela “Pesquisar Entidade” com a opção Por CNPJ marcada, o CNPJ 96523063000100 preenchido, o botão Pesquisar, a Creche Madre Teresa de Calcutá selecionada na lista de entidades e o botão Avançar, todos em destaque.',
    marks: [
      { x: 48, y: 145, w: 70, h: 25 },
      { x: 279, y: 202, w: 214, h: 26 },
      { x: 327, y: 231, w: 62, h: 27 },
      { x: 42, y: 291, w: 322, h: 66 },
      { x: 364, y: 401, w: 63, h: 27 },
    ],
  },
  // Ainda sem arquivo: aparecem sozinhas quando a captura for salva (veja o fluxo acima).
  confirmacao: {
    alt: 'Tela de adesão com o CNPJ da entidade validado por um sinal verde, a razão social Associação Madre Teresa de Calcutá e o botão Confirmar Doação Automática ativo.',
    marks: [],
  },
  aviso: {
    alt: 'Aviso do portal com a mensagem “Doação automática registrada.” e o botão Ok.',
    marks: [],
  },
};

export function getShot(name: ShotName): Shot | undefined {
  const src = files[`../assets/tutorial/${name}.webp`];
  const d = dims[name];
  if (!src || !d) return undefined;
  return { name, src, w: d.w, h: d.h, ...DEFS[name] };
}
