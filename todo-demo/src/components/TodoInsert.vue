<template>
  <form :class="styles.TodoInsert" @submit.prevent="onSubmit">
    <input
      :class="styles.input"
      placeholder="할 일을 입력하세요"
      v-model="value"
    />
    <button :class="styles.button" type="submit">
      <Plus />
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import Plus from 'vue-material-design-icons/Plus.vue';
import styles from './TodoInsert.module.css';

const props = defineProps({
  onInsert: Function
});

const value = ref('');

const onSubmit = () => {
  props.onInsert(value.value);
  value.value = '';
};
</script>