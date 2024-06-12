<template>
  <div class="App">
    <Clock />
    <MiniForecast :temperatures="temperatures" :timeLabels="timeLabels" :weatherIcons="weatherIcons" />
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else>
      <Area :data="area" />
      <Weather :data="weather" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Clock from './components/Clock.vue';
import Weather from './components/Weather.vue';
import Area from './components/Area.vue';
import MiniForecast from './components/MiniForecast.vue';
import { API_KEY } from './secret.js';

const temperatures = [25, 27, 27, 24, 21];
const timeLabels = ['12', '14', '16', '18', '20'];
const weatherIcons = ['S', 'C', 'C', 'R', 'R'];

const area = ref({});
const weather = ref({});
const error = ref(null);

const getWeatherData = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();

    if (!data.coord || !data.name || !data.weather || !data.main || !data.wind) {
      throw new Error('API 응답 데이터가 올바르지 않습니다.');
    }

    area.value = {
      lat: data.coord.lat,
      lon: data.coord.lon,
      name: data.name,
      desc: data.weather[0].description,
    };

    weather.value = {
      icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      desc: data.weather[0].description,
      temp: data.main.temp,
      speed: data.wind.speed,
      main: data.weather[0].main
    };
  } catch (err) {
    error.value = '날씨 정보를 가져오는데 실패했습니다.';
  }
};

onMounted(() => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeatherData(lat, lon);
    },
    () => {
      error.value = '위치 정보를 가져오는데 실패했습니다.';
    }
  );
});
</script>

<style scoped>
.App {
  text-align: center;
}

.error {
  color: red;
}
</style>
