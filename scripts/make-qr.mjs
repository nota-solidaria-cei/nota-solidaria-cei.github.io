/**
 * Gera um QR Code ESTÁTICO (SVG + PNG) para a URL pública definitiva.
 * Roda 100% offline, sem serviços externos e sem custos recorrentes: o QR Code gerado
 * nunca expira nem depende de terceiros.
 *
 * Uso:   npm run qr -- https://usuario.github.io/nota-solidaria/
 *        npm run qr -- https://usuario.github.io/nota-solidaria/#parceiro parceiro   (QR para comerciantes)
 *
 * IMPORTANTE: só gere o QR Code depois que a página estiver publicada na URL definitiva
 * e teste lendo o código com pelo menos dois celulares diferentes antes de imprimir.
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import QRCode from 'qrcode';

const [, , rawUrl, label = 'principal'] = process.argv;

if (!rawUrl) {
  console.error('Informe a URL pública. Ex.: npm run qr -- https://usuario.github.io/nota-solidaria/');
  process.exit(1);
}

let url;
try {
  url = new URL(rawUrl);
} catch {
  console.error(`URL inválida: ${rawUrl}`);
  process.exit(1);
}
if (url.protocol !== 'https:') {
  console.error('Use uma URL https:// (a página publicada).');
  process.exit(1);
}
if (/^(localhost|127\.|0\.0\.0\.0|192\.168\.|10\.)/.test(url.hostname)) {
  console.error('Essa URL é local e não funciona fora do seu computador. Use a URL pública definitiva.');
  process.exit(1);
}

const outDir = 'qr';
await mkdir(outDir, { recursive: true });
const name = `qr-nota-solidaria-${label.replace(/[^a-z0-9-]/gi, '-').toLowerCase()}`;
const options = {
  errorCorrectionLevel: 'H', // tolera sujeira/desgaste no papel
  margin: 4, // "zona de silêncio" recomendada
  color: { dark: '#172B4D', light: '#FFFFFF' },
};

const svgPath = path.join(outDir, `${name}.svg`);
const pngPath = path.join(outDir, `${name}.png`);
const svg = await QRCode.toString(url.href, { ...options, type: 'svg' });
await (await import('node:fs/promises')).writeFile(svgPath, svg, 'utf8');
await QRCode.toFile(pngPath, url.href, { ...options, type: 'png', width: 1600 });

console.log(`QR Code gerado para: ${url.href}`);
console.log(`  ${svgPath}   (vetorial: use este nos cartazes A3/A4)`);
console.log(`  ${pngPath}   (1600 px: WhatsApp e Canva)`);
console.log('Teste a leitura com dois celulares antes de imprimir.');
