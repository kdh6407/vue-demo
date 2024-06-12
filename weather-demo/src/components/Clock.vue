<template>
  <h2 id="clock">{{ clock }}</h2>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const clock = ref('');

function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  clock.value = `${hours}:${minutes}:${seconds}`;
}

let intervalId;

onMounted(() => {
  getClock(); // 초기화 호출
  intervalId = setInterval(getClock, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
#clock {
  font-size: 2rem;
  text-align: center;
}
</style>