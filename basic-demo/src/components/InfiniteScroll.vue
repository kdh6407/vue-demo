<template>
  <div class="scroll-container" @scroll="handleScroll">
    <div class="item" v-for="item in items" :key="item.id">{{ item.text }}</div>
    <div v-if="loading" class="loading">로딩 중...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const items = ref([]);
const loading = ref(false);
const page = ref(1);

const fetchItems = async () => {
  loading.value = true;
  // 임의의 데이터를 가져오는 API 호출
  const newItems = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 10 }, (v, k) => ({
          id: k + (page.value - 1) * 10,
          text: `아이템 ${k + (page.value - 1) * 10 + 1}`,
        }))
      );
    }, 1000);
  });
  items.value = [...items.value, ...newItems];
  loading.value = false;
  page.value++;
};

const handleScroll = (event) => {
  const bottom =
    event.target.scrollHeight - event.target.scrollTop ===
    event.target.clientHeight;
  if (bottom && !loading.value) {
    fetchItems();
  }
};

onMounted(() => {
  fetchItems();
});
</script>

<style scoped>
.scroll-container {
  height: 400px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
}
.item {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.loading {
  padding: 10px;
  text-align: center;
}
</style>
