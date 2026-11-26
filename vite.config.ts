import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Preenche as meta tags absolutas (og:url, og:image...) com a URL pública.
 * Defina VITE_SITE_URL no build (o workflow do GitHub Pages já faz isso).
 * Sem a variável, essas tags são removidas em vez de ficarem quebradas.
 */
function siteMeta(siteUrl: string): Plugin {
  const normalized = siteUrl ? siteUrl.replace(/\/?$/, '/') : '';
  return {
    name: 'site-meta',
    transformIndexHtml(html) {
      if (normalized) return html.replaceAll('__SITE_URL__', normalized);
      return html
        .split('\n')
        .filter((line) => !line.includes('__SITE_URL__'))
        .join('\n');
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return {
    // Caminhos relativos: funciona em qualquer endereço do GitHub Pages
    // (usuario.github.io/repositorio/ ou domínio próprio).
    base: './',
    plugins: [react(), tailwindcss(), siteMeta(env.VITE_SITE_URL ?? '')],
    build: {
      target: 'es2020',
      sourcemap: false,
    },
  };
});
