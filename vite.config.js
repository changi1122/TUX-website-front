import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [react()],
      server: {
        proxy: {
            '/api': {
                target: 'http://localhost:4001',
                changeOrigin: true,
            }
        }
    }
  };
}); 