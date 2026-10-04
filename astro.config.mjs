import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static build. `format: 'file'` writes /bryan as bryan.html so GitHub Pages
// can serve /bryan without redirecting to /bryan/.
export default defineConfig({
  site: 'https://graynote.io',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  integrations: [sitemap()],
});
