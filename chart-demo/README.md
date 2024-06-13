## 개발 환경에서 API 설정

- .env 파일에 아래 키값 설정 필요 (VITE_ 는 prefix 임)
  > VITE_NAVER_API_CLIENT_ID=YOUR_NAVER_API_CLIENT_ID
  VITE_NAVER_API_CLIENT_SECRET=YOUR_NAVER_API_CLIENT_SECRET

## 개발 환경에서 네이버 API CORS 문제 해결

- 프로젝트 루트의 vite.config.js 파일에 내용 추가 (server.proxy 부분)

```js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'https://openapi.naver.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
```

## 이 프로젝트에서 사용한 차트, 드래그 및 리사이즈 컴포넌트

- 차트 <https://vue-chartjs.org/>

- 드래그 및 리사이즈 컴포넌트 <https://draggable-resizable-vue3.netlify.app/>
