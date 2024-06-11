<template>
  <TodoTemplate>
    <TodoInsert @insert="onInsert" />
    <TodoList :todos="todos" @remove="onRemove" @toggle="onToggle" />
  </TodoTemplate>
</template>

<script setup>
import { ref, reactive } from 'vue';
import TodoInsert from './components/TodoInsert.vue';
import TodoList from './components/TodoList.vue';
import TodoTemplate from './components/TodoTemplate.vue';

// 반응형 상태 선언
const todos = reactive([
  { id: 1, text: '리액트의 기초 알아보기', checked: true },
  { id: 2, text: '컴포넌트 스타일링해 보기', checked: true },
  { id: 3, text: '일정 관리 앱 만들어 보기', checked: false },
]);

const nextId = ref(todos.length + 1); //단일값에 주로 사용, nextId.value 로 값을 다룸

// 메서드 정의
const onInsert = (text) => {
  const todo = { id: nextId.value, text: text, checked: false };
  todos.push(todo);
  nextId.value++;
};

const onRemove = (id) => {
  const index = todos.findIndex(todo => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
  }
};

const onToggle = (id) => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.checked = !todo.checked;
  }
};
</script>