import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
  ],
  base: '/',
  server: {
    host: 'localhost',
    port: 8080
  },
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, './src/')}`,
      '@ELEMENT_THEME': `${path.resolve(__dirname, './node_modules/element-plus/theme-chalk/src/')}`
    },
  },
})
