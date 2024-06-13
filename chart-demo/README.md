## 개발 환경에서 API 설정

- 프로젝트 루트에 .env 파일을 생성하고 아래 내용(키/값) 설정 필요 (VITE_ 는 prefix 임)
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

## 이 프로젝트에서 활용하는 네이버 API

- 네이버 쇼핑인사이트: **분야 내 연령별 트렌드 조회**
  - [레퍼런스 바로가기](https://developers.naver.com/docs/serviceapi/datalab/shopping/shopping.md#%EC%87%BC%ED%95%91%EC%9D%B8%EC%82%AC%EC%9D%B4%ED%8A%B8-%EB%B6%84%EC%95%BC-%EB%82%B4-%EC%97%B0%EB%A0%B9%EB%B3%84-%ED%8A%B8%EB%A0%8C%EB%93%9C-%EC%A1%B0%ED%9A%8C)

- 참고: [네이버 쇼핑인사이트](https://developers.naver.com/docs/serviceapi/datalab/shopping/shopping.md#%EC%87%BC%ED%95%91%EC%9D%B8%EC%82%AC%EC%9D%B4%ED%8A%B8)

## 이 프로젝트에서 사용한 차트, 드래그 및 리사이즈 컴포넌트

- 차트 <https://vue-chartjs.org/>

- 드래그 및 리사이즈 컴포넌트 <https://draggable-resizable-vue3.netlify.app/>
