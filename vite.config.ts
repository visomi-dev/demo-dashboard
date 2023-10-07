import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src/client',
  plugins: [solidPlugin()],
  build: {
    outDir: '../../src/server/public',
  },
  resolve: {
    alias: {
      '@/client': '/app',
      '@/client/stores': '/app/stores',
      '@/client/utils': '/app/utils',
    },
  },
});
