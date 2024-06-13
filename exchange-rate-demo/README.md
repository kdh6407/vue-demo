# 환율계산기

- [한국수출입은행 오픈API](https://www.koreaexim.go.kr/ir/HPHKIR020M01?apino=2&viewtype=C)
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
        secure: false, // SSL 인증서 검증 비활성화
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
```

## 학습 목표

1. 변수 연결을 위한 v-bind, v-model 이해하기

2. 생명주기 중 컴포넌트 활성화(onMounted) 함수 사용

3. API 조회를 위한 fetch 함수 사용하기
    - 비동기 방식 처리를 위한 async/await 사용

4. 반응형 변수를 위한 ref 함수 사용
    - watch 함수를 통해 ref 변수의 변화 감시하기
