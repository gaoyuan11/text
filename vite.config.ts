import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    proxy: {
      '/system': {
        target: 'http://124.221.31.76:9300', // 目标接口前缀
        changeOrigin: true, // 开启跨域
        rewrite: path => path.replace(/\/system/, '') // 路径重写
      }
    }
  }
})
