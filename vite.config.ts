import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      workbox: {
        // Admin pages must always load the current deployment instead of the
        // precached app shell; otherwise an installed PWA can keep generating
        // referral links with an older JavaScript bundle.
        navigateFallbackDenylist: [/^\/admin(?:\/|$)/],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
      },
      manifest: {
        name: 'HVE Admin',
        short_name: 'HVE Admin',
        description: 'Huy Vo Education Admin App',
        theme_color: '#ffffff',
        background_color: '#f3f4f6',
        display: 'standalone',
        start_url: '/admin',
        icons: [
          {
            src: 'favicon.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: 'favicon.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ],
})
