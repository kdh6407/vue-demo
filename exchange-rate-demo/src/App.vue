<template>
  <div>
    <h1>환율 계산기</h1>
    <div>
      <label for="date">날짜: </label>
      <button @click="changeDate(-1)">이전</button>
      <input id="date" v-model="date" type="date" @change="fetchExchangeRates" />
      <button @click="changeDate(1)">다음</button>
    </div>
    <div>
      <label for="currency">단위: </label>
      <select id="currency" v-model="selectedCurrency">
        <option v-for="currency in currencies" :key="currency.cur_unit" :value="currency.cur_unit">
          {{ currency.cur_unit }} - {{ currency.cur_nm }} - {{ currency.deal_bas_r }}
        </option>
      </select>
    </div>
    <div>
      <label :for="selectedCurrency">{{ currencyLabel }} 금액: </label>
      <input :id="selectedCurrency" v-model.number="amount" type="number" />
    </div>
    <div>
      <label for="krwAmount">원화 금액: </label>
      <input id="krwAmount" v-model.number="krwAmount" type="number" />
    </div>
    <div>
      <p v-if="errorMessage">{{ errorMessage }}</p>
      <p v-else>원화 환산 금액: <strong>{{ convertedAmount.toFixed(2) }}</strong> 원</p>
      <p v-if="krwAmount">역 환산 금액: <strong>{{ reversedAmount.toFixed(2) }}</strong> {{ currencyLabel }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { format, addDays } from 'date-fns';

const apiKey = import.meta.env.VITE_APP_API_KEY;
const date = ref(format(new Date(), 'yyyy-MM-dd'));
const currencies = ref([]);
const selectedCurrency = ref('USD');
const amount = ref(0);
const krwAmount = ref(0);
const errorMessage = ref('');

const fetchExchangeRates = async () => {
  try {
    const response = await fetch(
      `/api/site/program/financial/exchangeJSON?authkey=${apiKey}&searchdate=${date.value.replace(/-/g, '')}&data=AP01`
    );
    if (!response.ok) {
      throw new Error('네트워크 응답이 올바르지 않습니다.');
    }
    const data = await response.json();
    if (data.length === 0) {
      throw new Error('해당 날짜에 대한 환율 데이터를 찾을 수 없습니다.');
    }
    currencies.value = data;
    errorMessage.value = '';
  } catch (error) {
    errorMessage.value = error.message;
    currencies.value = [];
  }
};

const changeDate = (days) => {
  date.value = format(addDays(new Date(date.value), days), 'yyyy-MM-dd');
  fetchExchangeRates();
};

const currencyLabel = computed(() => {
  const currency = currencies.value.find(c => c.cur_unit === selectedCurrency.value);
  return currency ? currency.cur_nm : '달러';
});

const convertedAmount = computed(() => {
  const currency = currencies.value.find(c => c.cur_unit === selectedCurrency.value);
  return currency ? (amount.value * parseFloat(currency.deal_bas_r.replace(/,/g, ''))) : 0;
});

const reversedAmount = computed(() => {
  const currency = currencies.value.find(c => c.cur_unit === selectedCurrency.value);
  return currency ? (krwAmount.value / parseFloat(currency.deal_bas_r.replace(/,/g, ''))) : 0;
});

watch(date, fetchExchangeRates);
watch(selectedCurrency, fetchExchangeRates);

onMounted(fetchExchangeRates);
</script>