<template>
  <div :class="styles.TodoListItem">
    <div
      :class="['checkbox', { checked: todo.checked }]"
      @click="() => onToggle(todo.id)"
    >
      <component :is="todo.checked ? CheckboxMarked : CheckboxBlankOutline" />
      <div :class="styles.text">{{ todo.text }}</div>
    </div>
    <div :class="styles.remove" @click="() => onRemove(todo.id)">
      <CloseCircleOutline />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import CheckboxMarked from 'vue-material-design-icons/CheckboxMarked.vue';
import CheckboxBlankOutline from 'vue-material-design-icons/CheckboxBlankOutline.vue';
import CloseCircleOutline from 'vue-material-design-icons/CloseCircleOutline.vue';
import styles from "./TodoListItem.module.css";

const props = defineProps({
  todo: Object,
  onRemove: Function,
  onToggle: Function,
});
</script>

<!-- <style module>
@import "./TodoListItem.module.css";
</style> -->
