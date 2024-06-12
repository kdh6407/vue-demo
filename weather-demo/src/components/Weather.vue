<template>
  <div id="weather">
    <span>{{ data.temp && data.temp.toFixed(1) }}℃</span>
    <span>{{ data.speed }}m/s</span>
  </div>
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
#weather {
  font-size: 1.2rem;
}

#weather span:nth-child(2) {
  margin-left: 20px;
}

#weather img {
  width: 50px;
  height: 50px;
}
</style>