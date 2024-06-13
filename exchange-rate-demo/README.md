## 환율계산기

- [한국수출입은행 오픈API](https://www.koreaexim.go.kr/ir/HPHKIR020M01?apino=2&viewtype=C&searchselect=&searchword=)
- 회원가입 후 API key 를 발급받아야 합니다

- 프로젝트 루트에 .env 파일을 생성하고 아래 내용(키/값) 설정 필요 (VITE_ 는 prefix 임)
  > VITE_APP_API_KEY=YOUR_API_KEY

## 개발 환경에서 API CORS 문제 해결

- 프로젝트 루트의 vite.config.js 파일에 내용 추가 (server.proxy 부분)

```js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'https://www.koreaexim.go.kr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
```

## 학습 목표

1. 변수 연결을 위한 v-bind, v-model 이해하기

- 생명주기 중 컴포넌트 상태 mount 처리하기

- v-model

- v-model.number

- v-bind, :

- ref, watch

- onMounted
