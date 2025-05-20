import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // 환경 변수 로드
  const env = loadEnv(mode, process.cwd());

  return {
    build: {
      outDir: 'build',
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