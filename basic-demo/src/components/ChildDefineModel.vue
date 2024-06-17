<template>
  <div>
    <label for="title">책 제목 입력:</label>
    <input id="title" v-model="title" />

    <label for="author">책 저자 입력:</label>
    <input id="author" v-model="author" />
  </div>
</template>

<script setup>
const title = defineModel('title', { required: true });
const author = defineModel('author');
</script>