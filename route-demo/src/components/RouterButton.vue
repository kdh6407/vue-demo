<template>
  <router-link :to="to" custom v-slot="{ navigate }">
    <button @click="navigate">
      <slot>메인으로 이동</slot>
    </button>
  </router-link>
</template>

<script setup>
defineProps({
  to: {
    type: String,
    required: true
  }
});
</script>