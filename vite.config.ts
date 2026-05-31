import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/neuro_play_app/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
