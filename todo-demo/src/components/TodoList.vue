<template>
  <div :class="styles.TodoList">
    <TodoListItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @remove="onRemove"
      @toggle="onToggle"
    />
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import TodoListItem from "./TodoListItem.vue";
import styles from "./TodoList.module.css";

const props = defineProps({
  todos: Array,
  onRemove: Function,
  onToggle: Function,
});
</script>