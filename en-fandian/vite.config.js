import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    'import.meta.env.VITE_APP_TITLE': JSON.stringify(process.env.VITE_APP_TITLE || '世纪金源酒店'),
  },
  resolve: {
    alias: {
      '@': new URL('src', import.meta.url).pathname
    }
  },
  build: {
    outDir: 'cn-fandian'
  }
})
