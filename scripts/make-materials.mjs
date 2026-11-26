/**
 * Gera os materiais de divulgação da campanha, 100% offline (sem serviços externos):
 *
 *   public/materials/banner-nota-solidaria.pdf          banner vertical, proporção A3 (30 × 42 cm), vetorial
 *   public/materials/divulgacao-nota-solidaria.png      imagem para redes sociais, 1080 × 1350 (feed 4:5)
 *   public/og-image.png                                 prévia de link (WhatsApp, Facebook...), 1200 × 630
 *
 * Uso:
 *   npm run materials                                     sem QR Code (traz o passo a passo e o CNPJ)
 *   npm run materials -- https://usuario.github.io/nota/  com QR Code apontando para a página publicada
 *
 * Os dados (CNPJ, WhatsApp, Instagram, texto "mais de 160 crianças") vêm de src/config/institution.ts.
 * Nenhuma foto é usada: nenhuma criança aparece nos materiais.
 *
 * Precisa do Google Chrome (ou Edge) instalado. Se não achar, defina CHROME_PATH com o caminho do executável.
 * PREVIEW_DIR=pasta  também grava PNGs de conferência do banner.
 *
 * IMPORTANTE: com QR Code, só use a URL pública definitiva e teste a leitura em dois celulares antes de imprimir.
 */
import { existsSync, readFileSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import QRCode from 'qrcode';
import { chromium } from 'playwright-core';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public', 'materials');
const { institution: I } = await import('../src/config/institution.ts');

// ---------- URL opcional (QR Code) ----------
const rawUrl = process.argv[2];
let siteUrl = null;
if (rawUrl) {
  let u;
  try {
    u = new URL(rawUrl);
  } catch {
    console.error(`URL inválida: ${rawUrl}`);
    process.exit(1);
  }
  if (u.protocol !== 'https:') {
    console.error('Use uma URL https:// (a página publicada).');
    process.exit(1);
  }
  if (/^(localhost|127\.|0\.0\.0\.0|192\.168\.|10\.)/.test(u.hostname)) {
    console.error('Essa URL é local e não funciona fora do seu computador. Use a URL pública definitiva.');
    process.exit(1);
  }
  siteUrl = u.href;
}
const qrSvg = siteUrl
  ? await QRCode.toString(siteUrl, { type: 'svg', errorCorrectionLevel: 'H', margin: 0, color: { dark: '#172B4D', light: '#FFFFFF' } })
  : null;

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
.qr{background:#fff;display:grid;place-items:center}
.qr svg{display:block;width:100%;height:100%}
`;

// ---------- BANNER (1123 × 1587 px ≈ 30 × 42 cm) ----------
const bannerHtml = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Banner Nota Solidária</title><style>
${baseCss}
@page{size:1123px 1587px;margin:0}
html,body{width:1123px;height:1587px}
.b{position:relative;width:1123px;height:1587px;overflow:hidden;background:linear-gradient(180deg,#05B1E8 0%,#2456A8 46%,#1D3F95 100%);color:#fff;padding:62px 84px 54px;display:flex;flex-direction:column}
.b .logo{gap:22px}
.b .logo .name{font-size:76px}
.b .logo .inst{font-size:28px}
.pill{align-self:flex-start;margin-top:38px;background:rgba(10,42,112,.55);border:2px solid rgba(255,255,255,.4);border-radius:999px;padding:10px 28px;font-size:30px;font-weight:600}
h1{margin-top:16px;font-size:136px;line-height:.98;font-weight:800;letter-spacing:-0.035em}
h1 span{color:#FFC23D}
.lead{margin-top:20px;font-size:44px;line-height:1.14;font-weight:400;max-width:21em}
.lead b{font-weight:700}
.free{margin-bottom:30px;margin-top:14px;display:flex;align-items:center;gap:14px;font-size:38px;font-weight:600}
.how{position:relative;margin-top:auto;background:#fff;color:#172B4D;border-radius:46px;padding:32px 46px 28px;box-shadow:0 30px 70px rgba(5,20,70,.4)}
.how h2{font-size:30px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#FF247D}
.how ol{list-style:none;margin-top:16px;display:flex;flex-direction:column;gap:16px}
.how li{display:flex;align-items:center;gap:22px;font-size:36px;line-height:1.14;font-weight:500}
.how li b{font-weight:700;color:#29469D}
.how .n{flex:none;width:62px;height:62px;border-radius:50%;background:#29469D;color:#fff;display:grid;place-items:center;font-size:36px;font-weight:800}
.how .cnpj{display:inline-block;margin-top:6px;background:#FFF4DD;border:3px solid #FFD98A;border-radius:18px;padding:2px 16px;font-size:42px;font-weight:800;letter-spacing:.02em;color:#172B4D;white-space:nowrap}
.foot{margin-top:24px;display:flex;align-items:center;gap:30px}
.foot .qr{width:200px;height:200px;border-radius:24px;padding:14px;flex:none}
.foot .t{font-size:36px;line-height:1.16;font-weight:500}
.foot .t b{font-weight:800}
.foot .u{margin-top:6px;font-size:28px;font-weight:600;opacity:.95;word-break:break-all}
.small{margin-top:20px;font-size:28px;font-weight:500;line-height:1.25;opacity:.97}
</style></head><body><div class="b">
<i class="abs" style="width:560px;height:560px;right:-190px;top:-150px;background:rgba(255,255,255,.1)"></i>
<i class="abs" style="width:250px;height:250px;right:80px;top:440px;border:6px solid rgba(255,255,255,.2)"></i>
<i class="abs" style="width:150px;height:150px;right:140px;top:330px;background:#FFAA20"></i>
<i class="abs" style="width:96px;height:96px;right:48px;top:610px;background:#FF247D"></i>
<i class="abs" style="width:380px;height:380px;left:-160px;bottom:330px;background:rgba(119,63,163,.4)"></i>
<div class="logo">${symbol(120)}<div><div class="name">Nota solidária<i>.</i></div><div class="inst">${I.name}</div></div></div>
<p class="pill">Pequenos gestos, grandes futuros.</p>
<h1>Sua nota<br><span>transforma vidas.</span></h1>
<p class="lead">Ajude <b>${I.childrenLabel}</b> com as compras que você já faz.</p>
<p class="free"><svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#FFC23D" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m8.5 12.5 2.4 2.4 4.8-5"/></svg>Sem gastar nada a mais.</p>
<section class="how">
<h2>Como doar em 3 passos</h2>
<ol>
<li><span class="n">1</span><span>Entre na <b>Nota Fiscal Paulista</b><br><span style="font-size:28px;color:#43567A">${portalHost}</span></span></li>
<li><span class="n">2</span><span>Abra <b>Entidades › Doações de Cupons com CPF (automática)</b></span></li>
<li><span class="n">3</span><span>Clique em <b>Pesquisar</b>, informe o CNPJ e confirme<br><span class="cnpj">${I.cnpj}</span></span></li>
</ol>
</section>
<div class="foot">
${qrSvg ? `<div class="qr">${qrSvg}</div><div class="t"><b>Escaneie</b> e veja o passo a passo completo.<div class="u">${siteUrl.replace(/^https:\/\//, '')}</div></div>` : `<div class="t">Procure a <b>${I.nfpName}</b><br>na lista de entidades da Nota Fiscal Paulista.</div>`}
</div>
<p class="small">Também recebemos notas sem CPF.<br>Fale com o CEI: WhatsApp <span style="white-space:nowrap">${I.whatsapp.display}</span> · Instagram <span style="white-space:nowrap">${I.instagram.handle}</span></p>
</div></body></html>`;

// ---------- IMAGEM DE DIVULGAÇÃO (1080 × 1350 px) ----------
const postHtml = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Divulgação Nota Solidária</title><style>
${baseCss}
html,body{width:1080px;height:1350px}
.p{position:relative;width:1080px;height:1350px;overflow:hidden;background:linear-gradient(135deg,#2747B5 0%,#365FD6 42%,#7A38C7 100%);color:#fff;padding:76px 76px 68px;display:flex;flex-direction:column}
.p .logo{gap:22px}
.p .logo .name{font-size:76px}
.p .logo .inst{font-size:27px}
.p h1{margin-top:60px;font-size:132px;line-height:.98;font-weight:800;letter-spacing:-0.035em}
.p h1 span{color:#FFC23D}
.p .lead{margin-top:30px;font-size:50px;line-height:1.16;max-width:20em}
.p .lead b{font-weight:700}
.card{margin-top:auto;position:relative;background:#fff;color:#172B4D;border-radius:48px;padding:40px 46px;display:flex;align-items:center;gap:36px;box-shadow:0 26px 60px rgba(10,15,70,.4)}
.card .tx{flex:1;min-width:0}
.card h2{font-size:32px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#FF247D}
.card p{margin-top:10px;font-size:40px;line-height:1.14;font-weight:500}
.card p b{font-weight:700;color:#29469D}
.card .cnpj{display:inline-block;margin-top:16px;background:#FFF4DD;border:3px solid #FFD98A;border-radius:16px;padding:4px 18px;font-size:48px;font-weight:800;letter-spacing:.02em;white-space:nowrap}
.card .qr{width:250px;height:250px;border-radius:24px;padding:14px;flex:none;border:3px solid #E3EAF7}
.p .by{margin-top:30px;display:flex;justify-content:space-between;align-items:center;font-size:34px;font-weight:600}
</style></head><body><div class="p">
<i class="abs" style="width:520px;height:520px;right:-170px;top:-160px;background:rgba(255,255,255,.1)"></i>
<i class="abs" style="width:130px;height:130px;right:90px;top:400px;background:#FFAA20"></i>
<i class="abs" style="width:84px;height:84px;right:250px;top:560px;background:#FF247D"></i>
<i class="abs" style="width:60px;height:60px;right:70px;top:560px;background:#00A9E5;border:5px solid rgba(255,255,255,.45)"></i>
<div class="logo">${symbol(104)}<div><div class="name">Nota solidária<i>.</i></div><div class="inst">${I.name}</div></div></div>
<h1>Sua nota<br><span>transforma vidas.</span></h1>
<p class="lead">Ajude <b>${I.childrenLabel}</b> sem gastar nada a mais.</p>
<section class="card">
<div class="tx">
<h2>Cadastre uma vez. Ajude sempre.</h2>
<p>Na <b>Nota Fiscal Paulista</b>, abra <b>Entidades › Doações de Cupons com CPF (automática)</b> e pesquise o CNPJ:</p>
<span class="cnpj">${I.cnpj}</span>
</div>
${qrSvg ? `<div class="qr">${qrSvg}</div>` : ''}
</section>
<div class="by"><span>${I.instagram.handle}</span><span>${qrSvg ? 'Escaneie e veja o passo a passo' : I.nfpName}</span></div>
</div></body></html>`;

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
  // banner (PDF vetorial)
  {
    const page = await browser.newPage({ viewport: { width: 1123, height: 1587 } });
    await page.setContent(bannerHtml, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({ path: path.join(OUT, 'banner-nota-solidaria.pdf'), width: '1123px', height: '1587px', printBackground: true, pageRanges: '1' });
    if (process.env.PREVIEW_DIR) await page.screenshot({ path: path.join(process.env.PREVIEW_DIR, 'banner-preview.png') });
    // confere se algum conteúdo estourou a página (rolagem além de 1587 px)
    const overflow = await page.evaluate(() => {
      const b = document.querySelector('.b');
      const kids = [...b.children].filter((e) => !e.classList.contains('abs'));
      const bottom = Math.max(...kids.map((e) => e.getBoundingClientRect().bottom));
      return { bottom: Math.round(bottom), limit: b.getBoundingClientRect().bottom, scrollH: b.scrollHeight };
    });
    console.log(`✓ banner-nota-solidaria.pdf  (conteúdo até ${overflow.bottom}px de ${Math.round(overflow.limit)}px)`);
    if (overflow.scrollH > 1588) console.warn('⚠ O conteúdo do banner passou da altura da página. Revise os textos.');
    await page.close();
  }
  // imagem de divulgação (PNG)
  {
    const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
    await page.setContent(postHtml, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(OUT, 'divulgacao-nota-solidaria.png'), clip: { x: 0, y: 0, width: 1080, height: 1350 } });
    const scrollH = await page.evaluate(() => document.querySelector('.p').scrollHeight);
    console.log('✓ divulgacao-nota-solidaria.png  1080×1350');
    if (scrollH > 1351) console.warn('⚠ O conteúdo da imagem passou da altura. Revise os textos.');
    await page.close();
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
console.log(siteUrl ? `\nQR Code aponta para: ${siteUrl}\nTeste a leitura em dois celulares antes de imprimir.` : '\nGerado SEM QR Code. Depois de publicar a página: npm run materials -- <URL pública>');
