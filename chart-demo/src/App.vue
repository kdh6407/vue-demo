<template>
  <div id="app">
    <form @submit.prevent="fetchData">
      <label for="startDate">조회 시작 월:</label>
      <input type="month" v-model="startDate" required>
      <label for="endDate">조회 종료 월:</label>
      <input type="month" v-model="endDate" required>
      <button type="submit">조회</button>
    </form>
    <LineChart v-if="datacollection" :chartData="datacollection" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import LineChart from './components/LineChart.vue';

// 오늘 날짜를 가져오는 함수
const getCurrentDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

// n개월 전 날짜를 가져오는 함수
const getPastDate = (months) => {
  const date = new Date();
  date.setMonth(date.getMonth() - months);
  return date.toISOString().split('T')[0];
};

// 해당 월의 마지막 날짜를 가져오는 함수
const getLastDateOfMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

// 초기 값 설정
const today = new Date();
const endDate = ref(today.toISOString().slice(0, 7)); // YYYY-MM
const startDate = ref(getPastDate(3).slice(0, 7)); // YYYY-MM
const datacollection = ref(null);

const fetchData = async () => {
  const endYearMonth = endDate.value.split('-');
  const endYear = parseInt(endYearMonth[0], 10);
  const endMonth = parseInt(endYearMonth[1], 10) - 1;
  let endDay;

  if (endYear === today.getFullYear() && endMonth === today.getMonth()) {
    endDay = today.getDate();
  } else {
    endDay = getLastDateOfMonth(endYear, endMonth);
  }

  const endDateString = `${endDate.value}-${String(endDay).padStart(2, '0')}`;

  try {
    const response = await fetch('/api/v1/datalab/shopping/category/age', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Naver-Client-Id': import.meta.env.VITE_NAVER_API_CLIENT_ID,
        'X-Naver-Client-Secret': import.meta.env.VITE_NAVER_API_CLIENT_SECRET
      },
      body: JSON.stringify({
        startDate: `${startDate.value}-01`,
        endDate: endDateString,
        timeUnit: 'month',
        category: '50000204',
        device: '',
        ages: [],
        gender: ''
      })
    });

    const data = await response.json();
    const resultData = data.results[0].data;
    const labels = Array.from(new Set(resultData.map(d => d.period.slice(0, 7))));
    const ageGroups = Array.from(new Set(resultData.map(d => d.group)));
    const datasets = ageGroups.map(group => {
      return {
        label: `${group}대`,
        data: labels.map(label => {
          const item = resultData.find(d => d.period.startsWith(label) && d.group === group);
          return item ? item.ratio : 0;
        }),
        fill: false,
        borderColor: getRandomColor(),
        tension: 0.1
      };
    });

    datacollection.value = {
      labels: labels,
      datasets: datasets
    };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// endDate 변경 시 미래 날짜로 설정된 경우 현재 월로 변경
watch(endDate, (newEndDate) => {
  const selectedDate = new Date(newEndDate);
  if (selectedDate > today) {
    endDate.value = today.toISOString().slice(0, 7);
  }
});

onMounted(() => {
  fetchData();
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

form {
  margin-bottom: 20px;
}

form label {
  margin-right: 10px;
}

form input {
  margin-right: 10px;
}

form button {
  padding: 5px 10px;
}
</style>
