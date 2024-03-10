import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/tea-time',
  plugins: [
    preact(),
    VitePWA({
      devOptions: {
        enabled: true,
      },
      registerType: 'autoUpdate',
      manifest: {
        name: 'Tea Time',
        short_name: 'Tea Time',
        start_url: 'index.html',
        id: '/tea-time/index.html',
        display: 'standalone',
        background_color: '#000000',
        lang: 'en-US',
        description: 'Tea brewing infusion timer',
        theme_color: 'transparent',
        orientation: 'any',
        icons: [
          {
            src: 'maskable.svg',
            sizes: 'any',
            type: 'image/svg',
            purpose: 'maskable',
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icon-144.png',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icon-72.png',
            sizes: '72x72',
            type: 'image/png',
            purpose: 'any',
          },
        ],
        shortcuts: [
          {
            name: '60s',
            url: '?start=60',
            description: 'Start 60 seconds timer',
            icons: [
              {
                src: 'start-60.svg',
                sizes: '96x96',
                purpose: 'maskable',
              },
            ],
          },
          {
            name: '30s',
            url: '?start=30',
            description: 'Start 30 seconds timer',
            icons: [
              {
                src: 'start-30.svg',
                sizes: '96x96',
                purpose: 'maskable',
              },
            ],
          },
          {
            name: '15s',
            url: '?start=15',
            description: 'Start 15 seconds timer',
            icons: [
              {
                src: 'start-15.svg',
                sizes: '96x96',
                purpose: 'maskable',
              },
            ],
          },
          {
            name: '5s',
            url: '?start=5',
            description: 'Start 5 seconds timer',
            icons: [
              {
                src: 'start-5.svg',
                sizes: '96x96',
                purpose: 'maskable',
              },
            ],
          },
        ],
      },
    }),
  ],
})
