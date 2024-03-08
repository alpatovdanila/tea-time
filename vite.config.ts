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
    }),
  ],
})
