<template>
  <div>
    <h1>책 제목: {{ bookTitle }}</h1>
    <h2>책 저자: {{ bookAuthor }}</h2>
    <ChildDefineModel v-model:title="bookTitle" v-model:author="bookAuthor" />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import ChildDefineModel from './ChildDefineModel.vue';

const bookTitle = ref('');
const bookAuthor = ref('');
</script>