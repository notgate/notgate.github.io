import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        speech: resolve(__dirname, 'speech-to-text.html'),
        vibroacoustic: resolve(__dirname, 'vibroacoustic-monitoring.html'),
        vhdl: resolve(__dirname, 'game-boy-vga-pixel-pipeline.html'),
        vhdlLegacy: resolve(__dirname, 'pokemon-vhdl.html'),
        search: resolve(__dirname, 'search-engine.html'),
        switch: resolve(__dirname, 'switch-modchip.html'),
      },
    },
  },
  server: { host: '127.0.0.1', port: 5174, strictPort: true },
})
