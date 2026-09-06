import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// GitHub Pages serves this project from https://<user>.github.io/parrot-mimic/,
// so production builds need that sub-path as the base; local dev stays at '/'.
const isGhPagesBuild = process.env.DEPLOY_TARGET === 'gh-pages'

// https://vite.dev/config/
export default defineConfig({
  base: isGhPagesBuild ? '/parrot-mimic/' : '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: '앵무새 흉내내기',
        short_name: '앵무새',
        description: '내 목소리를 변조해서 따라 말해주는 앵무새 장난감',
        theme_color: '#fbbf24',
        background_color: '#fef3c7',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
})
