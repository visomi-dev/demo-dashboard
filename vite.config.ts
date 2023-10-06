import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src/client',
  plugins: [solidPlugin()],
  build: {
    outDir: '../../dist/client',
  },
  resolve: {
    alias: {
      '@/client/stores': '/app/stores',
      '@/client/utils': '/app/utils',
      '@/client/components': '/app/components',
    },
  },
});
