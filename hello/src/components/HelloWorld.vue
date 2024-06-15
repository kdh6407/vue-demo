<template>
  <div>
    <h1>반응형 상태를 잃어버리는 예제</h1>
    <p>사용자 이름: {{ user.name }}</p>
    <button @click="updateUserName">사용자 이름 변경</button>
    <button @click="replaceUser">사용자 객체 교체</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const user = ref({
  name: '1',
  age: 25
});

const updateUserName = () => {
  // user의 반응형 유지됨
  user.name = '이순신';
};

const replaceUser = () => {
  // user의 반응형 잃어버림
  // user = {
  //   name: '강감찬',
  //   age: 30
  // };
  Object.assign(user, {
    name: '이영희',
    age: 30
  });
};
</script>

<style scoped>
button {
  margin: 5px;
}
</style>
