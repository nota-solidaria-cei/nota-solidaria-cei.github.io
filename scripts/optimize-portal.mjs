/**
 * Converte as capturas de tela do portal da Nota Fiscal Paulista (originals/portal/*.png)
 * em WebP sem perdas dentro de src/assets/tutorial/, e grava shots.json com as dimensões.
 *
 *   npm run portal
 *
 * Convenção: "NN-nome.png" vira "nome.webp". O passo a passo (src/config/tutorialShots.ts) procura
 * estas imagens pelo nome: menu, adesao, pesquisa, confirmacao, aviso. As que não existirem
 * simplesmente não aparecem no tutorial.
 *
 * PRIVACIDADE: antes de colocar uma captura aqui, confira se NÃO aparecem CPF, nome, e-mail, telefone
 * ou saldo de ninguém. Recorte a captura na origem. O script só remove sobras de interface (CROPS)
 * e nunca altera nem apaga o que está em /originals.
 */
import { existsSync } from 'node:fs';
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'originals', 'portal');
const OUT = path.join(ROOT, 'src', 'assets', 'tutorial');

/**
 * Recortes que removem só sobras da captura (texto de outro link e uma letra cortada na borda).
 * `pad` acrescenta margem branca (o fundo do portal é branco) para o recorte não ficar colado na borda.
 */
const CROPS = {
  menu: { left: 12, top: 0, width: 268, height: 93, pad: { bottom: 6 } },
};

if (!existsSync(SRC)) {
  console.error(`Pasta não encontrada: ${SRC}\nSalve as capturas do portal (PNG) nela, como 01-menu.png, 02-adesao.png...`);
  process.exit(1);
}

await mkdir(OUT, { recursive: true });
for (const f of await readdir(OUT)) if (/\.webp$/i.test(f)) await rm(path.join(OUT, f));

const files = (await readdir(SRC)).filter((f) => /\.(png|jpe?g|webp)$/i.test(f)).sort();
const meta = {};

for (const f of files) {
  const name = path.parse(f).name.replace(/^\d+[-_]/, '').toLowerCase();
  let img = sharp(path.join(SRC, f)).rotate();
  const crop = CROPS[name];
  if (crop) {
    const m = await sharp(path.join(SRC, f)).metadata();
    if (crop.left + crop.width > m.width || crop.top + crop.height > m.height) {
      throw new Error(`Recorte fora da imagem em ${f}: imagem ${m.width}×${m.height}`);
    }
    img = img.extract({ left: crop.left, top: crop.top, width: crop.width, height: crop.height });
    if (crop.pad) img = img.extend({ top: 0, left: 0, right: 0, bottom: 0, ...crop.pad, background: '#ffffff' });
  }
  const info = await img.flatten({ background: '#ffffff' }).webp({ lossless: true }).toFile(path.join(OUT, `${name}.webp`));
  meta[name] = { w: info.width, h: info.height };
  console.log(`✓ ${f}${crop ? ' (recortada)' : ''} -> src/assets/tutorial/${name}.webp  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)} kB`);
}

await writeFile(path.join(OUT, 'shots.json'), JSON.stringify(meta, null, 2) + '\n');
console.log(`\nPronto: ${files.length} captura(s). Confira o resultado em src/assets/tutorial e rode "npm run dev".`);
