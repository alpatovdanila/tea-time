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
        theme_color: '#000000',
        orientation: 'any',
        icons: [72, 144, 192, 512].flatMap((size) => [
          {
            src: `icons/maskable/icon-${size}.svg`,
            sizes: `${size}x${size}`,
            type: 'image/svg',
            purpose: 'maskable',
          },
          {
            src: `icons/maskable/icon-${size}.png`,
            sizes: `${size}x${size}`,
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: `icons/shaped/icon-${size}.svg`,
            sizes: `${size}x${size}`,
            type: 'image/svg',
            purpose: 'any',
          },
          {
            src: `icons/shaped/icon-${size}.png`,
            sizes: `${size}x${size}`,
            type: 'image/png',
            purpose: 'any',
          },
        ]),
        shortcuts: [60, 30, 15, 5].map((time) => ({
          name: `${time}s`,
          url: `?start=${time}`,
          description: `Start ${time} seconds timer`,
          icons: [
            {
              src: `icons/shortcuts/${time}.svg`,
              sizes: '96x96',
              purpose: 'any',
              type: 'image/svg',
            },
            {
              src: `icons/shortcuts/${time}.png`,
              sizes: '96x96',
              purpose: 'any',
              type: 'image/png',
            },
          ],
        })),
      },
    }),
  ],
})
