<template>
  <div style="display: flex; justify-content: center; align-items: center; height: 100%; width: 100%">
    <div ref="containerRef" class="container"
      style="width: 200px; height: 200px; border: 1px solid black; position: relative">
      <canvas ref="canvasRef" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import VueTypes from 'vue-types';

const props = defineProps({
  temperatures: VueTypes.arrayOf(Number).def([]),
  timeLabels: VueTypes.arrayOf(String).def([]),
  weatherIcons: VueTypes.arrayOf(String).def([]),
});

const canvasRef = ref(null);
const containerRef = ref(null);

const drawChart = (ctx, canvas, temperatures, timeLabels, weatherIcons, scaleRatio = 0.2) => {
  const width = canvas.width;
  const height = canvas.height;
  console.log(`drawChart :: ${width}, ${height}`)
  const padding = 25;
  const yPadding = 60;

  ctx.clearRect(0, 0, width, height);

  const pointSpacing = (width - padding * 2) / (temperatures.length - 1);
  const maxValue = Math.max(...temperatures);
  const minValue = Math.min(...temperatures);

  const yScale = (height - padding * 2) / (maxValue - minValue);
  const yOffset = height - yPadding;

  ctx.strokeStyle = 'lightgray';
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(padding, yOffset - (temperatures[0] - minValue) * yScale * scaleRatio);
  temperatures.forEach((value, index) => {
    const x = padding + index * pointSpacing;
    const y = yOffset - (value - minValue) * yScale * scaleRatio;

    if (index === 0) {
      ctx.lineTo(x - 15, y);
      ctx.moveTo(x, y);
    } else {
      const prevX = padding + (index - 1) * pointSpacing;
      const prevY = yOffset - (temperatures[index - 1] - minValue) * yScale * scaleRatio;
      ctx.quadraticCurveTo(prevX, prevY, x, y);
    }

    ctx.lineTo(x, y);
    ctx.moveTo(x, y);

    if (index === temperatures.length - 1) {
      ctx.lineTo(x + 15, y);
      ctx.moveTo(x, y);
    }
  });
  ctx.stroke();

  drawXLabels(ctx, timeLabels, padding, pointSpacing, height);
  drawDataValues(ctx, temperatures, padding, pointSpacing, yOffset, yScale, minValue, scaleRatio);
  drawIcons(ctx, weatherIcons, padding, pointSpacing, height);
};

const drawXLabels = (ctx, labels, padding, pointSpacing, height) => {
  ctx.font = '13px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'black';

  labels.forEach((label, index) => {
    const x = padding + index * pointSpacing;
    const y = height - padding / 2;
    if (index === 0) label += '시';
    ctx.fillText(label, x, y);
  });
};

const drawDataValues = (ctx, temperatures, padding, pointSpacing, yOffset, yScale, minValue, scaleRatio) => {
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'black';

  temperatures.forEach((value, index) => {
    const x = padding + index * pointSpacing;
    const y = yOffset - (value - minValue) * yScale * scaleRatio - 10;
    ctx.fillText(value + '°', x, y);
  });
};

const drawIcons = (ctx, icons, padding, pointSpacing, height) => {
  icons.forEach((icon, index) => {
    const img = new Image();
    img.src = './' + icon + '.svg';
    img.onload = () => {
      const x = padding + index * pointSpacing - img.width / 2;
      const y = height / 1.4;
      ctx.drawImage(img, x, y);
    };
  });
};

const resizeCanvas = (canvas, container, ctx, temperatures, timeLabels, weatherIcons) => {
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
  drawChart(ctx, canvas, temperatures, timeLabels, weatherIcons, 0.2);
};

onMounted(async () => {
  await nextTick();
  const canvas = canvasRef.value;
  const container = containerRef.value;
  const ctx = canvas.getContext('2d');

  const handleResize = () => resizeCanvas(canvas, container, ctx, props.temperatures, props.timeLabels, props.weatherIcons);
  handleResize();

  window.addEventListener('resize', handleResize);

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });
});

watch(() => [props.temperatures, props.timeLabels, props.weatherIcons], () => {
  const canvas = canvasRef.value;
  const container = containerRef.value;
  const ctx = canvas.getContext('2d');
  resizeCanvas(canvas, container, ctx, props.temperatures, props.timeLabels, props.weatherIcons);
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>