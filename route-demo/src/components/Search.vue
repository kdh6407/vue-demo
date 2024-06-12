<template>
  <div>
    <h1>검색 페이지</h1>
    <input type="text" v-model="searchTerm" placeholder="검색어를 입력하세요" />
    <button @click="handleSearch">검색</button>
    <p v-if="!query">검색어를 입력하고 검색해주세요</p>
    <p>검색어: {{ query }}</p>
    <RouterButton to="/">메인으로 이동</RouterButton>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import RouterButton from './RouterButton.vue';

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
</script>