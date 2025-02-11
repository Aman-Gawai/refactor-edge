import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: {
      clientPort: 443
    },
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:8000',
        changeOrigin: true,
        secure: false
      },
    },
    allowedHosts: [
      'cb39db46-d564-4895-9cb6-ec691754f7f3-00-36nmcnx1adf8p.picard.replit.dev'
    ]
  },
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  },
  preview: {
    host: true,
    port: 5173
  }
});