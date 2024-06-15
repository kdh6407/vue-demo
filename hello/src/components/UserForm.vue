<template>
  <div>
    <label>
      이름:
      <input v-model="internalData.name" placeholder="이름 입력" />
    </label>
    <label>
      이메일:
      <input v-model="internalData.email" placeholder="이메일 입력" />
    </label>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])

const internalData = ref({ ...props.modelValue })

watch(() => props.modelValue, (newValue) => {
  if (newValue !== internalData.value) {
    internalData.value = { ...newValue }
  }
}, { deep: true })

watch(internalData, (newValue) => {
  if (newValue !== props.modelValue) {
    emit('update:modelValue', newValue)
  }
}, { deep: true })
</script>
