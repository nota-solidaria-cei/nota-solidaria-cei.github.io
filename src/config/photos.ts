/**
 * Fotografias reais do CEI.
 *
 * Fluxo (sem mexer em código): descreva cada foto em originals/photos.json e rode `npm run images`.
 * O script gera os WebP em src/assets/images/ e os textos (alt, legenda, ponto focal) em
 * src/assets/images/photos.meta.json, que este arquivo lê.
 *
 *   hero.webp          -> foto circular do topo da página
 *   about-N.webp       -> colagem da seção "Sobre nós"
 *   gallery/NN-*.webp  -> galeria (ordem alfabética = ordem do manifesto)
 *
 * Enquanto não houver fotos, a página usa ilustrações próprias da campanha.
 * Nenhuma foto é gerada por IA nem vem da internet.
 */
import type { ArtKey } from '../components/illustrations';
import metaJson from '../assets/images/photos.meta.json';

const files = import.meta.glob('../assets/images/**/*.{webp,jpg,jpeg,png,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

type Meta = { alt?: string; caption?: string; position?: string };
const meta = metaJson as Record<string, Meta>;

const entries = Object.entries(files)
  .map(([path, url]) => ({ path: path.replace('../assets/images/', ''), url }))
  .sort((a, b) => a.path.localeCompare(b.path, 'pt-BR', { numeric: true }));

/** chave do meta = caminho sem extensão, ex.: "gallery/01-desjejum-com-cuscuz" */
const keyOf = (p: string) => p.replace(/\.[^.]+$/, '');

const DEFAULT_ALT = 'Atividade no CEI Madre Teresa de Calcutá';

export interface Photo {
  src: string;
  alt: string;
  /** Ponto focal (CSS object-position) para cortes em círculo/quadro. */
  position?: string;
}

export interface GalleryItem {
  id: string;
  src?: string;
  art?: ArtKey;
  alt: string;
  caption?: string;
  position?: string;
}

const toPhoto = (e: { path: string; url: string }): Photo => {
  const m = meta[keyOf(e.path)] ?? {};
  return { src: e.url, alt: m.alt ?? DEFAULT_ALT, position: m.position };
};

export const heroPhoto: Photo | undefined = (() => {
  const e = entries.find((x) => /^hero\./.test(x.path));
  return e ? toPhoto(e) : undefined;
})();

export const aboutPhotos: Photo[] = entries.filter((e) => /^about[-_]/.test(e.path)).map(toPhoto);

export const galleryPhotos: GalleryItem[] = entries
  .filter((e) => e.path.startsWith('gallery/'))
  .map((e) => {
    const m = meta[keyOf(e.path)] ?? {};
    return { id: e.path, src: e.url, alt: m.alt ?? DEFAULT_ALT, caption: m.caption, position: m.position };
  });

/** Usado enquanto não há fotos reais. São ilustrações, não fotografias. */
export const galleryFallback: GalleryItem[] = [
  { id: 'art-picnic', art: 'picnic', alt: 'Ilustração de um piquenique ao ar livre', caption: 'Piqueniques e convivência' },
  { id: 'art-play', art: 'play', alt: 'Ilustração de uma pipa no céu', caption: 'Brincadeiras ao ar livre' },
  { id: 'art-colors', art: 'colors', alt: 'Ilustração de manchas de tinta coloridas', caption: 'Experiências com cores' },
  { id: 'art-music', art: 'music', alt: 'Ilustração de notas musicais', caption: 'Musicalização' },
  { id: 'art-paint', art: 'paint', alt: 'Ilustração de pinceladas coloridas', caption: 'Pintura' },
  { id: 'art-blocks', art: 'blocks', alt: 'Ilustração de blocos de montar', caption: 'Descobertas e atividades pedagógicas' },
];

export const hasRealPhotos = galleryPhotos.length > 0;
