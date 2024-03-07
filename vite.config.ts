import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/tea-time',
  plugins: [
    preact(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Tea Time',
        short_name: 'TeaTime',
        description: 'Tea brewing infusion timer',
        theme_color: '#000',
        display: 'standalone',
        start_url: 'index.html',
        lang: 'en-US',
        // screenshots: [
        //   { src: 'horizontal.png', form_factor: 'wide', type: 'image/png' },
        //   { src: 'vertical.png', form_factor: 'narrow', type: 'image/png' },
        // ],
        icons: [
          {
            src: 'maskable.svg',
            sizes: 'any',
            type: 'image/svg',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
})
