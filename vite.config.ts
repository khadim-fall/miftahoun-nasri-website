import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  root: 'client',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'),
    },
  },
  build: {
    outDir: 'dist',       // <-- ici, dans client/dist
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
})