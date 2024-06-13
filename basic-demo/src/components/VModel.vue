<template>
  <div>
    <label for="content-input">내용을 입력하세요:</label>
    <input id="content-input" v-model="contentValue" type="text" />
    <p>실시간 입력한 내용: {{ contentValue }}</p>
  </div>
  <div>
    <label for="content-input">내용을 입력하고 엔터키를 누르세요:</label>
    <input id="content-input" v-model.lazy="lazyContentValue" type="text" />
    <p>입력한 내용: {{ lazyContentValue }}</p>
  </div>
  <div>
    <label for="number-input">숫자를 입력하세요:</label>
    <input id="number-input" v-model.number.lazy="numberValue" type="text" />
    <p>입력한 숫자: {{ numberValue }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const contentValue = ref('');
const lazyContentValue = ref('');
const numberValue = ref(0);

</script>