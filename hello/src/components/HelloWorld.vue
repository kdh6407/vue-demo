<template>
  <div>
    <ChildComponent :message="parentMessage" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const parentMessage = ref('안녕하세요, 자식 컴포넌트!')
</script>