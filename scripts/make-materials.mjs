/**
 * Gera materiais derivados, 100% offline (sem serviços externos), em public/:
 *
 *   materials/banner-nota-solidaria.pdf   a arte do banner (PNG da instituição) em 1 página A4, sem alterações
 *   og-image.png                          prévia de link (WhatsApp, Facebook...), 1200 × 630
 *
 * NÃO são gerados aqui, são as artes prontas da instituição (substitua o arquivo mantendo o nome):
 *   materials/banner-nota-solidaria.png          banner (com QR Code)
 *   materials/divulgacao-nota-solidaria.png      imagem para compartilhar nas redes sociais
 *
 * Uso:  npm run materials
 *
 * Os dados da prévia de link (texto "mais de 160 crianças", nome do CEI) vêm de src/config/institution.ts.
 * Precisa do Google Chrome (ou Edge) instalado. Se não achar, defina CHROME_PATH com o caminho do executável.
 */
import { existsSync, readFileSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public', 'materials');
const { institution: I } = await import('../src/config/institution.ts');

// ---------- Chrome ----------
function findChrome() {
  const env = process.env.CHROME_PATH;
  const candidates = [
    env,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    process.env.LOCALAPPDATA && `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`,
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean);
  return candidates.find((p) => existsSync(p));
}
const executablePath = findChrome();
if (!executablePath) {
  console.error('Não encontrei o Google Chrome. Instale-o ou defina CHROME_PATH com o caminho do executável.');
  process.exit(1);
}

// ---------- Peças comuns ----------
const fontFile = path.join(ROOT, 'node_modules', '@fontsource-variable', 'outfit', 'files', 'outfit-latin-wght-normal.woff2');
const fontB64 = readFileSync(fontFile).toString('base64');

const RECEIPT = 'M13 3H35A4 4 0 0 1 39 7V44L34 40.5L29 44L24 40.5L19 44L14 40.5L9 44V7A4 4 0 0 1 13 3Z';
const HEART =
  'M24 29C24 29 15 23 15 17.5C15 14.5 17.3 12.5 19.8 12.5C21.6 12.5 23.2 13.5 24 15C24.8 13.5 26.4 12.5 28.2 12.5C30.7 12.5 33 14.5 33 17.5C33 23 24 29 24 29Z';
const symbol = (size) => `<svg width="${size}" height="${size}" viewBox="0 0 48 48"><path d="${RECEIPT}" fill="#fff"/><path d="${HEART}" fill="#FF247D"/><rect x="16" y="32.5" width="16" height="2.6" rx="1.3" fill="#BFD0F0"/><rect x="16" y="37" width="10" height="2.6" rx="1.3" fill="#BFD0F0"/></svg>`;

const portalHost = new URL(I.nfp.portalUrl).host;

const baseCss = `
@font-face{font-family:'Outfit';src:url(data:font/woff2;base64,${fontB64}) format('woff2');font-weight:100 900;font-style:normal}
*{box-sizing:border-box;margin:0;padding:0}
html,body{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:'Outfit',system-ui,sans-serif;color:#172B4D;-webkit-font-smoothing:antialiased}
.abs{position:absolute;border-radius:50%}
.logo{display:flex;align-items:center}
.logo .name{font-weight:700;color:#fff;letter-spacing:-0.02em;line-height:1}
.logo .name i{color:#FFAA20;font-style:normal}
.logo .inst{font-weight:600;color:#fff;margin-top:.45em;letter-spacing:.01em;line-height:1}
`;

// ---------- PRÉVIA DE LINK / Open Graph (1200 × 630 px) ----------
const ogHtml = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Nota Solidária</title><style>
${baseCss}
html,body{width:1200px;height:630px;overflow:hidden}
.card{position:relative;width:1200px;height:630px;color:#fff;overflow:hidden;background:linear-gradient(245deg,#05b1e8 0%,#2456a8 62%)}
.glow1{position:absolute;left:-140px;top:-170px;width:460px;height:460px;border-radius:50%;background:rgba(0,169,229,.35);filter:blur(36px)}
.ring{position:absolute;right:-90px;top:40px;width:640px;height:640px;border-radius:50%;border:3px solid rgba(255,255,255,.18)}
.ring2{position:absolute;right:-170px;top:-30px;width:780px;height:780px;border-radius:50%;border:2px solid rgba(255,255,255,.1)}
.brand{position:absolute;left:72px;top:56px;display:flex;align-items:center;gap:16px}
.brand .name{font-size:44px;font-weight:700;letter-spacing:-0.5px;line-height:1;color:#fff}
.brand .name i{font-style:normal;color:#ffaa20}
.brand .sub{font-size:17px;font-weight:600;margin-top:6px}
h1{position:absolute;left:72px;top:150px;font-size:98px;line-height:.98;font-weight:800;letter-spacing:-2.5px;width:600px}
h1 span{color:#ffc23d}
.lead{position:absolute;left:72px;top:466px;font-size:34px;line-height:1.2;width:560px;font-weight:400}
.lead b{font-weight:700}
.art{position:absolute;right:78px;top:96px;width:438px;height:438px;border-radius:50%;overflow:hidden;box-shadow:0 24px 60px rgba(8,24,80,.45);border:8px solid rgba(255,255,255,.85)}
.dot{position:absolute;border-radius:50%}
</style></head><body><div class="card">
<div class="glow1"></div><div class="ring"></div><div class="ring2"></div>
<div class="brand">${symbol(64)}<div><div class="name">Nota solidária<i>.</i></div><div class="sub">${I.name}</div></div></div>
<h1>Sua nota <span>transforma vidas.</span></h1>
<p class="lead">Ajude <b>${I.childrenLabel}</b> sem gastar nada a mais.</p>
<div class="dot" style="right:48px;top:104px;width:104px;height:104px;background:#ffaa20;box-shadow:0 10px 24px rgba(0,0,0,.2)"></div>
<div class="dot" style="left:662px;top:468px;width:74px;height:74px;background:#ff247d;box-shadow:0 10px 24px rgba(0,0,0,.2)"></div>
<div class="dot" style="right:150px;top:520px;width:44px;height:44px;background:#00a9e5;border:4px solid rgba(255,255,255,.5)"></div>
<div class="art"><svg viewBox="0 0 400 400" width="438" height="438">
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFC23D"/><stop offset=".5" stop-color="#FF6454"/><stop offset="1" stop-color="#FF247D"/></linearGradient>
<filter id="sh" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#7A1442" flood-opacity=".35"/></filter></defs>
<rect width="400" height="400" fill="url(#bg)"/>
<circle cx="340" cy="60" r="120" fill="#fff" opacity=".16"/><circle cx="40" cy="360" r="110" fill="#fff" opacity=".12"/><circle cx="70" cy="90" r="46" fill="#fff" opacity=".2"/><circle cx="350" cy="330" r="34" fill="#FFAA20" opacity=".9"/>
<g filter="url(#sh)"><g transform="translate(200 206) rotate(-5) scale(5.1) translate(-24 -23.5)">
<path d="${RECEIPT}" fill="#fff"/><path d="${HEART}" fill="#FF247D"/>
<rect x="16" y="32.5" width="16" height="2.6" rx="1.3" fill="#C9D6F2"/><rect x="16" y="37" width="10" height="2.6" rx="1.3" fill="#C9D6F2"/></g></g>
<g fill="#fff"><path transform="translate(92 236) scale(1.5)" d="M0-12Q2.5-2.5 12 0Q2.5 2.5 0 12Q-2.5 2.5-12 0Q-2.5-2.5 0-12Z"/><path transform="translate(316 128) scale(1.2)" d="M0-12Q2.5-2.5 12 0Q2.5 2.5 0 12Q-2.5 2.5-12 0Q-2.5-2.5 0-12Z"/></g>
<g transform="translate(78 300) rotate(-28)"><rect width="64" height="15" rx="7.5" fill="#00A9E5"/><rect x="46" width="18" height="15" rx="7.5" fill="#fff" opacity=".45"/></g>
<g transform="translate(300 214) rotate(32)"><rect width="58" height="14" rx="7" fill="#773FA3"/><rect x="42" width="16" height="14" rx="7" fill="#fff" opacity=".4"/></g>
</svg></div>
</div></body></html>`;

// ---------- Renderização ----------
await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath });
try {
  // banner em PDF (a arte da instituição, sem alterações, em 1 página A4 cheia)
  {
    const bannerPng = path.join(OUT, 'banner-nota-solidaria.png');
    if (!existsSync(bannerPng)) {
      console.warn('⚠ public/materials/banner-nota-solidaria.png não existe: PDF do banner não gerado.');
    } else {
      const b64 = readFileSync(bannerPng).toString('base64');
      const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Banner Nota Solidária</title><style>
@page{size:210mm 297mm;margin:0}
*{margin:0;padding:0}
html,body{width:210mm;height:297mm}
img{display:block;width:210mm;height:297mm}
</style></head><body><img alt="Banner da campanha Nota Solidária" src="data:image/png;base64,${b64}"></body></html>`;
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'load' });
      await page.pdf({ path: path.join(OUT, 'banner-nota-solidaria.pdf'), width: '210mm', height: '297mm', printBackground: true, pageRanges: '1' });
      console.log('✓ banner-nota-solidaria.pdf  (A4, a partir do PNG da instituição)');
      await page.close();
    }
  }
  // prévia de link (Open Graph) — fica na raiz de public/, é o que index.html referencia
  {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
    await page.setContent(ogHtml, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(ROOT, 'public', 'og-image.png'), clip: { x: 0, y: 0, width: 1200, height: 630 } });
    console.log('✓ og-image.png  1200×630');
    await page.close();
  }
} finally {
  await browser.close();
}
console.log('\nPronto. O banner PNG e a imagem de divulgação das redes são as artes da instituição e não são alterados aqui.');
