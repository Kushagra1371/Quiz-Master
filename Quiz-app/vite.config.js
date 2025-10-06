import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // frontend dev server
    proxy: {
      '/quizservice': {
        target: 'http://localhost:2010',
        changeOrigin: true,
        secure: false
      },
      '/questionservice': {
        target: 'http://localhost:2010',
        changeOrigin: true,
        secure: false
      }
    }
  }
});
