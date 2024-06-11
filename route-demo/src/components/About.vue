<template>
    <div>
      <h1>About 페이지</h1>
      <p>이 페이지는 About 페이지입니다.</p>
      <p>전달받은 파라미터: {{ name }}</p>
      <button @click="goToMain">메인으로 이동</button>
    </div>
  </template>
  
  <script>
  import { useRoute, useRouter } from 'vue-router';
  
  export default {
    name: 'About',
    setup() {
      const route = useRoute();
      const router = useRouter();
      const name = route.params.name;
  
      const goToMain = () => {
        router.push('/');
      };
  
      return {
        name,
        goToMain
      };
    }
  };
  </script>
  
  <style scoped>
  /* 스타일을 추가하세요 */
  </style>
  