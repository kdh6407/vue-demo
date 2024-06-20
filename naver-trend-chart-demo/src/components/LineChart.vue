<template>
  <div>
    <draggable-resizable-vue v-model:w="element.w" v-model:h="element.h" v-model:x="element.x" v-model:y="element.y"
      v-model:active="element.isActive" :draggable="true" :resizeable="true" :lock-aspect-ratio="true">
      <Line :data="chartData" :options="chartOptions" />
    </draggable-resizable-vue>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import DraggableResizableVue from 'draggable-resizable-vue3';

const element = ref({
  x: window.screen.availWidth * 0.24,
  y: window.screen.availHeight * 0.01,
  w: window.screen.availWidth * 0.5,
  h: window.screen.availHeight * 0.5,
  isActive: false,
})

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const props = defineProps({
  chartData: {
    type: Object,
    required: true
  }
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
};
</script>