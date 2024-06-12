## vue-router 예제

- Vue 프로젝트 생성 및 초기화

- Vue 라우터 설치
  > yarn add vue-router

- 프로젝트 구조
  > **/src/**
  >> App.vue, main.js

  >> **/components/**
  >>> About.vue, Info.vue, Main.vue, Search.vue
  
  >> **/router/**
  >>> index.js

- Vue 라우터 설정 (router/index.js)

- 메인 앱 설정 (src/main.js)

- App.vue 컴포넌트의 router-link 적용 (src/App.vue)

  ```html
  <template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <router-view></router-view>
  </div>
  </template>
  ```

  - router-view 영역 사이에 컴포넌트가 표시됩니다

- router-link 커스텀
  - 기본적으로 router-link 는 a 태그로 변환됩니다
  - 다만 button 요소 등을 활용할 필요가 있을때는 아래처럼 사용합니다
    - router-link 에 custom 속성을 정의하고
    - v-slot 속성으로 자식 컴포넌트에게 자신의 속성을 제공합니다

  ```html
    <router-link to="/" custom v-slot="{ navigate }">
      <button @click="navigate">메인으로 이동</button>
    </router-link>
  ```
