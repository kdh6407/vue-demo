## news api

- tailwindcss 기반의 카드 형태의 디자인을 적용한 뉴스 api 조회 예제

- 개발 환경(-D) 에 tailwind 및 관련 컴포넌트 추가
  > yarn add -D tailwindcss postcss autoprefixer

- 프로젝트에 tailwindcss 구성
  > yarn tailwindcss init -p

- tailwind.config.js 파일을 열고 content 항목에 아래 내용을 기입합니다
  > content: ['./src/**/*.{vue,js,jsx,ts,tsx}', './public/index.html'],

- src/index.css 파일 내용을 모두 지우고 아래 내용으로 기입합니다
  > @import 'tailwindcss/base';<br>
    @import 'tailwindcss/components';<br>
    @import 'tailwindcss/utilities';
