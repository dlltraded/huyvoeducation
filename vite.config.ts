import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // The previous offline cache kept old HTML and asset hashes alive after
      // deployments, leaving the admin UI stale and local images broken. Ship
      // one final worker that unregisters itself and clears those caches.
      selfDestroying: true,
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
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
