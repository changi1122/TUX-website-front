import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // 환경 변수 로드
  const env = loadEnv(mode, process.cwd());

  return {
    build: {
      outDir: 'build',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('@blocknote')) return 'vendor-blocknote';
              if (id.includes('@mantine')) return 'vendor-mantine';
              if (id.includes('@tanstack')) return 'vendor-tanstack';
              if (id.includes('react-router') || id.includes('react-dom') || id.includes('react/')) return 'vendor-react';
              if (id.includes('swiper')) return 'vendor-swiper';
              return 'vendor';
            }
          },
        },
      },
    },
    plugins: [react()],
      server: {
        proxy: {
            '/api': {
                target: env.VITE_API_URL,
                changeOrigin: true,
            }
        }
    },
    assetsInclude: ['**/*.md']
  };
}); 