<template>
  <h2 id="location">
    {{ data.name }} is {{ data.desc }}
  </h2>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
#location {
  font-size: 1.5rem;
  text-align: center;
}
</style>