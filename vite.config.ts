import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type UserConfig } from 'vite'
import path from 'node:path'

export default defineConfig(({ mode }): UserConfig => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.VITE_BASE_PATH || '/'

  return {
    base,
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
    build: {
      target: 'es2022',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/gsap')) return 'gsap'
            if (id.includes('node_modules/lenis')) return 'lenis'
          },
        },
      },
    },
  }
})
