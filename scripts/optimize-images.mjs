/**
 * Converte as fotos originais (pasta /originals) em WebP otimizado para o site.
 *
 * REGRAS (do projeto): os arquivos originais NUNCA são alterados nem apagados.
 * Este script só (1) recorta, quando você pede, para remover a interface do Instagram
 * (cabeçalho, contadores 1/9, ícones), (2) respeita a orientação EXIF e (3) reduz o
 * tamanho/peso. Nenhum filtro, ajuste de cor, retoque, ampliação ou IA é aplicado
 * (imagens pequenas ficam no tamanho original, nunca são esticadas).
 *
 * MODO MANIFESTO (recomendado): descreva cada foto em originals/photos.json
 *   [
 *     { "source": "foto.jpg",            // arquivo em /originals
 *       "group": "hero" | "about" | "gallery",
 *       "name": "desjejum-com-cuscuz",   // vira parte do nome do arquivo
 *       "crop": { "left": 0, "top": 96, "width": 1179, "height": 1434 },  // opcional, em pixels
 *       "alt": "Descrição fiel do que a foto mostra",  // acessibilidade
 *       "caption": "Legenda curta (opcional)",
 *       "position": "50% 30%",           // ponto focal ao cortar em círculo/quadro (opcional)
 *       "publish": true,                 // false = fica preparada, mas NÃO vai para o site
 *       "note": "por que não publicar (opcional)" }
 *   ]
 *   A ordem do manifesto é a ordem na página. Saídas:
 *     hero    -> src/assets/images/hero.webp
 *     about   -> src/assets/images/about-N.webp
 *     gallery -> src/assets/images/gallery/NN-nome.webp
 *   Os textos (alt, legenda, ponto focal) vão para src/assets/images/photos.meta.json.
 *
 * MODO SIMPLES (sem manifesto): hero-*.jpg, about-N.jpg e os demais nomes viram a galeria.
 *
 * Uso:  npm run images
 */
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'originals';
const OUT = 'src/assets/images';
const GALLERY = path.join(OUT, 'gallery');
const META = path.join(OUT, 'photos.meta.json');
const EXT = /\.(jpe?g|png|webp|avif|heic)$/i;
const WIDTH = { hero: 1200, about: 1000, gallery: 1600 };

const slug = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();

if (!existsSync(SRC)) {
  console.error(`Pasta "${SRC}" não encontrada.`);
  process.exit(1);
}

/** Monta a lista de trabalho a partir do manifesto ou dos nomes dos arquivos. */
async function loadJobs() {
  const manifestPath = path.join(SRC, 'photos.json');
  if (existsSync(manifestPath)) {
    const list = JSON.parse(await readFile(manifestPath, 'utf8'));
    return { mode: 'manifesto', jobs: list };
  }
  const files = (await readdir(SRC)).filter((f) => EXT.test(f)).sort((a, b) => a.localeCompare(b, 'pt-BR', { numeric: true }));
  const crops = existsSync(path.join(SRC, 'crops.json')) ? JSON.parse(await readFile(path.join(SRC, 'crops.json'), 'utf8')) : {};
  const jobs = files.map((f) => {
    const base = path.parse(f).name;
    const group = /^hero/i.test(base) ? 'hero' : /^about[-_]/i.test(base) ? 'about' : 'gallery';
    return { source: f, group, name: slug(base).replace(/^\d+-?/, '') || 'foto', crop: crops[f] };
  });
  return { mode: 'simples', jobs };
}

const { mode, jobs } = await loadJobs();
if (jobs.length === 0) {
  console.log(`Nenhuma imagem em "${SRC}". Coloque as fotos originais lá e rode de novo.`);
  process.exit(0);
}

// Recria só os arquivos gerados (nunca toca em /originals).
await mkdir(GALLERY, { recursive: true });
for (const f of await readdir(GALLERY)) if (/\.webp$/i.test(f)) await rm(path.join(GALLERY, f));
for (const f of await readdir(OUT)) if (/^(hero|about-.*)\.webp$/i.test(f)) await rm(path.join(OUT, f));

const meta = {};
const held = [];
let galleryIndex = 1;
let aboutIndex = 1;
let heroDone = false;

for (const job of jobs) {
  const { source, group, name, crop } = job;
  if (!['hero', 'about', 'gallery'].includes(group)) throw new Error(`"group" inválido em ${source}: ${group}`);
  const input = path.join(SRC, source);
  if (!existsSync(input)) throw new Error(`Arquivo não encontrado: ${input}`);

  if (job.publish === false) {
    held.push(`${source}${job.note ? ` — ${job.note}` : ''}`);
    continue;
  }

  let rel;
  if (group === 'hero') {
    if (heroDone) throw new Error('Só pode haver uma foto "hero".');
    heroDone = true;
    rel = 'hero';
  } else if (group === 'about') {
    rel = `about-${aboutIndex++}`;
  } else {
    rel = `gallery/${String(galleryIndex++).padStart(2, '0')}-${slug(name || path.parse(source).name)}`;
  }
  const target = path.join(OUT, `${rel}.webp`);

  let img = sharp(input).rotate(); // só corrige a orientação EXIF
  if (crop) {
    const m = await sharp(input).metadata();
    const [W, H] = (m.orientation ?? 1) >= 5 ? [m.height, m.width] : [m.width, m.height];
    const { left, top, width, height } = crop;
    if (left < 0 || top < 0 || left + width > W || top + height > H) {
      throw new Error(`Recorte fora da imagem em ${source}: imagem ${W}×${H}, recorte ${JSON.stringify(crop)}`);
    }
    img = img.extract({ left, top, width, height });
  }
  const info = await img.resize({ width: WIDTH[group], withoutEnlargement: true }).webp({ quality: 82 }).toFile(target);
  console.log(`✓ ${source}${crop ? ' (recortada)' : ''} -> ${target.replaceAll('\\', '/')}  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)} kB`);

  if (mode === 'manifesto') {
    const d = {};
    if (job.alt) d.alt = job.alt;
    if (job.caption) d.caption = job.caption;
    if (job.position) d.position = job.position;
    meta[rel] = d;
  }
}

if (mode === 'manifesto') await writeFile(META, JSON.stringify(meta, null, 2) + '\n', 'utf8');

if (held.length) {
  console.log(`\n⏸ ${held.length} foto(s) preparada(s) mas NÃO publicada(s) ("publish": false):`);
  for (const h of held) console.log(`   - ${h}`);
}
console.log('\nPronto. Confira as fotos em src/assets/images e rode "npm run dev".');
console.log('Lembrete: publique apenas fotos com autorização da instituição e evite rostos identificáveis.');
