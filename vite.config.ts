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
      '@/client/utils': 'src/client/app/utils',
      '@/client/components': 'src/client/app/components',
    },
  },
});
