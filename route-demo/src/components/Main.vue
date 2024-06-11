<template>
    <div>
      <h1>메인 페이지</h1>
      <p>환영합니다! 이 페이지는 메인 페이지입니다.</p>
      <router-link to="/search?query=오늘 점심">오늘 점심 검색</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Main'
  };
  </script>
  
  <style scoped>
  /* 스타일을 추가하세요 */
  </style>
  