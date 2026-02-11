import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const adapter =
  process.env.ASTRO_ADAPTER === 'node'
    ? (await import('@astrojs/node')).default({ mode: 'standalone' })
    : undefined;

export default defineConfig({
  adapter,
  site: 'https://example.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
