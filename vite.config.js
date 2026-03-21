import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import learnContentPlugin from './vite-plugin-learn-content.js';

export default defineConfig({
  plugins: [learnContentPlugin(), react()],
  root: path.resolve(__dirname),
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 5174,
    host: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
