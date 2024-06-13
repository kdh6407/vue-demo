<template>
  <div id="app">
    <b-container>
      <b-row class="my-4">
        <b-col>
          <h1 class="text-center">환율 계산기</h1>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6">
          <b-form-group label="날짜 선택" label-for="date-input">
            <Datepicker id="date-input" v-model="date" />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="통화 선택" label-for="currency-select">
            <b-form-select id="currency-select" v-model="selectedCurrency">
              <option v-for="currency in currencies" :key="currency.cur_unit" :value="currency.cur_unit">
                {{ currency.cur_nm }} ({{ currency.cur_unit }})
              </option>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6">
          <b-form-group label="금액 입력 (USD)" label-for="amount-input">
            <b-form-input id="amount-input" v-model="amount" type="number"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="금액 입력 (KRW)" label-for="krw-amount-input">
            <b-form-input id="krw-amount-input" v-model="krwAmount" type="number"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="my-4">
        <b-col>
          <b-alert variant="success" v-if="convertedAmount">
            {{ amount }} {{ selectedCurrency }} 는 {{ convertedAmount }} KRW 입니다.
          </b-alert>
          <b-alert variant="success" v-if="reversedAmount">
            {{ krwAmount }} KRW 는 {{ reversedAmount }} {{ selectedCurrency }} 입니다.
          </b-alert>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-alert variant="danger" v-if="errorMessage">
            오류: {{ errorMessage }}
          </b-alert>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { format, addDays } from 'date-fns';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

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
watch([amount, krwAmount], () => {
  convertedAmount.value;
  reversedAmount.value;
});

onMounted(fetchExchangeRates);
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.css';
@import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
</style>
