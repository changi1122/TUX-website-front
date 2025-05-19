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
                target: import.meta.env.VITE_API_URL,
                changeOrigin: true,
            }
        }
    },
    assetsInclude: ['**/*.md']
  };
}); 