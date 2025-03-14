import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  resolve: {
    preserveSymlinks: true,
    alias: {
      '@components': '/src/components',
      '@utils': '/src/utils',
      '@assets': '/src/assets',
      '@styles': '/src/styles',
      "@features": "/src/features",
      "@widgets": "/src/widgets",
      "@store": "/src/store",
    },
  },
  server: {
    https: true,
    proxy: {
      "/api": {
        target: "https://bitrix-api.mantera.digital",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
