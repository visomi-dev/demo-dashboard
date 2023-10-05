import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src/client',
  plugins: [solidPlugin()],
  build: {
    outDir: '../../dist/client',
  },
});
