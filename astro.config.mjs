import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const useBackend = process.env.ASTRO_ADAPTER === 'node';
const adapter = useBackend
  ? (await import('@astrojs/node')).default({ mode: 'standalone' })
  : undefined;

export default defineConfig({
  output: useBackend ? 'server' : 'static',
  adapter,
  site: 'https://example.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
