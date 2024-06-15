<template>
  <div>{{ message }}</div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  message: {
    type: String,
    required: true
  }
})
</script>