<template>
    <div>
        <label for="number-input">숫자를 입력하세요:</label>
        <input id="number-input" v-model="inputValue" type="text" @input="filterNumber" />
        <p>입력한 숫자: {{ numberValue }}</p>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const inputValue = ref('');
const numberValue = computed(() => parseFloat(inputValue.value) || 0);

const filterNumber = () => {
    const filteredValue = inputValue.value.replace(/[^0-9.]/g, '');
    inputValue.value = filteredValue;
};

watch(inputValue, (newValue) => {
    inputValue.value = newValue.replace(/[^0-9.]/g, '');
});
</script>