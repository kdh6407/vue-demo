<template>
  <div>
    <nav>
      <ul>
        <li>
          <router-link to="/">메인</router-link>
        </li>
        <li>
          <router-link to="/about">About</router-link>
        </li>
        <li>
          <router-link to="/about/John">About John</router-link>
        </li>
        <li>
          <router-link to="/info">Info</router-link>
        </li>
        <li>
          <router-link to="/search">Search</router-link>
        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style scoped>
/* 스타일을 추가하세요 */
</style>
