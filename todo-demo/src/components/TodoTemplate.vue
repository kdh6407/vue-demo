<template>
  <div :class="styles.TodoTemplate">
    <div :class="styles.title">일정 관리</div>
    <div :class="styles.content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import styles from "./TodoTemplate.module.css";
</script>
<!-- 
<style module>
@import "./TodoTemplate.module.css";
</style> -->
