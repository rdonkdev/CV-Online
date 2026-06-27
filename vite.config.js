import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ command }) => ({
  // Em produção (GitHub Pages) o site é servido em /CV-Online/.
  // Em desenvolvimento mantém-se na raiz.
  base: command === 'build' ? '/CV-Online/' : '/',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      // Ícones e head links a partir de pwa-assets.config.js (gerados de logo.svg).
      pwaAssets: { config: true, overrideManifestIcons: true },
      manifest: {
        name: 'Gerador de CV Online',
        short_name: 'CV Online',
        description: 'Cria o teu CV com múltiplos templates e exporta para PDF.',
        lang: 'pt',
        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'standalone',
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        // Mantém a fonte Inter (Google Fonts) disponível offline após a 1.ª visita.
        runtimeCaching: [
          {
            urlPattern: ({ url }) =>
              url.origin === 'https://fonts.googleapis.com' ||
              url.origin === 'https://fonts.gstatic.com',
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    globals: true,
  },
}))
