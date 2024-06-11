<template>
    <div>
      <h1>Info 페이지</h1>
      <p>이 페이지는 Info 페이지입니다.</p>
      <button @click="goToMain">메인으로 이동</button>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'Info',
    setup() {
      const router = useRouter();
  
      const goToMain = () => {
        router.push('/');
      };
  
      return {
        goToMain
      };
    }
  };
  </script>
  
  <style scoped>
  /* 스타일을 추가하세요 */
  </style>
  