import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/odoo': {
        target: 'https://digres-cz-pokusy.odoo.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/odoo/, ''),
        secure: true
      }
    }
  }
})
