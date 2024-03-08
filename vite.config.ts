import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/tea-time',
  plugins: [
    preact(),
    VitePWA({
      injectManifest: {},
      registerType: 'autoUpdate',
      manifest: {
        name: 'Tea Time',
        short_name: 'TeaTime',
        start_url: 'index.html',
        id: '/tea-time/index.html',
        display: 'standalone',
        background_color: '#000',
        lang: 'en-US',
        scope: '/tea-time/',
        description: 'Tea brewing infusion timer',
        theme_color: '#000',
        icons: [
          {
            src: 'maskable.svg',
            sizes: 'any',
            type: 'image/svg',
            purpose: 'maskable',
          },
          {
            src: 'maskable.svg',
            sizes: '512x512',
            type: 'image/svg',
            purpose: 'maskable',
          },
          {
            src: 'icon-144.svg',
            sizes: '144x144',
            type: 'image/svg',
            purpose: 'any',
          },
          {
            src: 'icon-72.svg',
            sizes: '72x72',
            type: 'image/svg',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
})
