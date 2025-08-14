import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import environment from 'vite-plugin-environment';

// https://vite.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: true,
  },
  plugins: [
    react(),
    environment('all', { prefix: 'CANISTER_' }),
    environment('all', { prefix: 'DFX_' }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4943',
        changeOrigin: true,
      },
    },
  },
});
