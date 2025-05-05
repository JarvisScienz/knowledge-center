import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/knowledge-center/',
  plugins: [react()],
  server: {
    port: 6173,
  },
})
