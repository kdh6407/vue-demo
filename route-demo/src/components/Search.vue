<template>
  <div>
    <h1>검색 페이지</h1>
    <input type="text" v-model="searchTerm" placeholder="검색어를 입력하세요" />
    <button @click="handleSearch">검색</button>
    <p v-if="!query">검색어를 입력하고 검색해주세요</p>
    <p>검색어: {{ query }}</p>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'Search',
  setup() {
    const searchTerm = ref('');
    const router = useRouter();
    const route = useRoute();
    const query = ref(route.query.query || ''); //화면에 표시할 요소는 ref/watch 를 통해 관리해야 한다

    const handleSearch = () => {
      router.push(`/search?query=${searchTerm.value}`);
    };

    watch(
      () => route.query.query,
      (newQuery) => {
        query.value = newQuery || '';
      }
    );

    return {
      searchTerm,
      handleSearch,
      query
    };
  }
};
</script>

<style scoped>
/* 스타일을 추가하세요 */
</style>
