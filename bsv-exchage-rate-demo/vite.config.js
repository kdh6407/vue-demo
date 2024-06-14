import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { BootstrapVueNextResolver } from 'bootstrap-vue-next'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [BootstrapVueNextResolver()],
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://www.koreaexim.go.kr',
        changeOrigin: true,
        secure: false, // SSL 인증서 검증 비활성화
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
