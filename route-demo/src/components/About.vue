<template>
  <div>
    <h1>About 페이지</h1>
    <p>이 페이지는 About 페이지입니다.</p>
    <p>전달받은 파라미터: {{ name }}</p>
    <RouterButton to="/">메인으로 이동</RouterButton>
    <button type="button" @click="aboutFamily">About John's Family</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import RouterButton from './RouterButton.vue';

const route = useRoute();
const router = useRouter();

const name = ref(route.params.name);

const aboutFamily = () => {
  router.push({ name: 'AboutName', params: { name: 'John Family' } });
}

// watch를 사용하여 라우트 파라미터 변경 감지
watch(
  () => route.params.name,
  (newName) => {
    name.value = newName;
  }
);
</script>