import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',         // or "0.0.0.0" to listen on all IPs
    port: 5173,         // default port or change if needed
  },
})
