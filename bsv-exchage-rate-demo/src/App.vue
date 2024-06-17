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
          <b-input-group prepend="조회 일자 선택" class="mt-3">
            <b-form-input id="date-input" v-model="date" type="date" />
          </b-input-group>
        </b-col>
        <b-col md="6">
          <b-input-group prepend="통화 유형 선택" class="mt-3">
            <b-form-select id="currency-select" v-model="selectedCurrency">
              <option v-for="currency in currencies" :key="currency.cur_unit" :value="currency.cur_unit">
                {{ currency.cur_nm }} ({{ currency.cur_unit }})
              </option>
            </b-form-select>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6">
          <b-form-group id="fieldset-1" :description="`KRW ${formatNumber(convertedAmount)} 입니다`"
            :label="`${selectedCurrency} to KRW : ${selectedCurrencyName} 👉 한국 원 (KRW) 계산합니다`" label-for="amount-input"
            floating class="mt-3">
            <b-form-input id="amount-input" v-model="amountDisplay" trim placeholder="금액을 입력해주세요" type="text"
              @focus="onAmountFocus" @keyup="onAmountChange" @blur="onAmountChange" />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group id="fieldset-1" :description="`${selectedCurrency} ${formatNumber(reversedAmount)} 입니다`"
            :label="`KRW to ${selectedCurrency} : 한국 원 (KRW) 👉 ${selectedCurrencyName} 계산합니다`"
            label-for="krw-amount-input" floating class="mt-3">
            <b-form-input id="krw-amount-input" v-model="krwAmountDisplay" trim placeholder="금액을 입력해주세요" type="text"
              @focus="onKrwAmountFocus" @keyup="onKrwAmountChange" @blur="onKrwAmountChange" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="my-4">
        <b-col>
          <b-alert :model-value="true" variant="success" v-if="amount > 0 && convertedAmount !== null"
            class="position-relative">
            <span>{{ selectedCurrency }} {{ formatNumber(amount) }} | KRW {{ formatNumber(convertedAmount) }}</span>
            <b-button pill variant="outline-primary" size="sm" class="position-absolute top-0 end-0 m-2"
              @click="copyToClipboard(`${selectedCurrency} ${formatNumber(amount)} | KRW ${formatNumber(convertedAmount)}`, 'amount')">
              <span v-if="copied.amount">✔️</span>
              <span v-else>📋</span>
            </b-button>
          </b-alert>
          <b-alert :model-value="true" variant="success" v-if="krwAmount > 0 && reversedAmount !== null"
            class="position-relative">
            <span>KRW {{ formatNumber(krwAmount) }} | {{ selectedCurrency }} {{ formatNumber(reversedAmount) }}</span>
            <b-button pill variant="outline-primary" size="sm" class="position-absolute top-0 end-0 m-2"
              @click="copyToClipboard(`KRW ${formatNumber(krwAmount)} | ${selectedCurrency} ${formatNumber(reversedAmount)}`, 'krw')">
              <span v-if="copied.krw">✔️</span>
              <span v-else>📋</span>
            </b-button>
          </b-alert>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-alert :model-value="true" variant="danger" v-if="errorMessage">
            오류: {{ errorMessage }}
          </b-alert>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { format } from 'date-fns';

const apiKey = import.meta.env.VITE_APP_API_KEY;
const date = ref(format(new Date(), 'yyyy-MM-dd'));
const currencies = ref([]);
const selectedCurrency = ref('USD');
const amount = ref(0);
const krwAmount = ref(0);
const amountDisplay = ref('0');
const krwAmountDisplay = ref('0');
const errorMessage = ref('');
const copied = ref({ amount: false, krw: false });

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

const convertedAmount = computed(() => {
  const currency = currencies.value.find(c => c.cur_unit === selectedCurrency.value);
  return currency ? amount.value * parseFloat(currency.deal_bas_r.replace(/,/g, '')) : null;
});

const reversedAmount = computed(() => {
  const currency = currencies.value.find(c => c.cur_unit === selectedCurrency.value);
  return currency ? krwAmount.value / parseFloat(currency.deal_bas_r.replace(/,/g, '')) : null;
});

const selectedCurrencyName = computed(() => {
  const currency = currencies.value.find(c => c.cur_unit === selectedCurrency.value);
  return currency ? `${currency.cur_nm} (${currency.cur_unit})` : '미국 달러 (USD)';
});

const formatNumber = (value) => {
  if (value === null || value === undefined) return '';
  return value.toLocaleString('en-US');
};

const onAmountFocus = () => {
  amountDisplay.value = amount.value.toString();
};

const onAmountChange = () => {
  const parsedAmount = parseFloat(amountDisplay.value.replace(/,/g, ''));
  amount.value = isNaN(parsedAmount) ? 0 : parsedAmount;
  amountDisplay.value = formatNumber(amount.value);
};

const onKrwAmountFocus = () => {
  krwAmountDisplay.value = krwAmount.value.toString();
};

const onKrwAmountChange = () => {
  const parsedKrwAmount = parseFloat(krwAmountDisplay.value.replace(/,/g, ''));
  krwAmount.value = isNaN(parsedKrwAmount) ? 0 : parsedKrwAmount;
  krwAmountDisplay.value = formatNumber(krwAmount.value);
};

const copyToClipboard = (text, type) => {
  navigator.clipboard.writeText(text).then(() => {
    copied.value[type] = true;
    setTimeout(() => {
      copied.value[type] = false;
    }, 1000);
  }).catch(err => {
    console.error('클립보드 복사 실패: ', err);
  });
};

watch(date, fetchExchangeRates);
watch(selectedCurrency, fetchExchangeRates);

onMounted(fetchExchangeRates);

watch(amount, () => {
  amountDisplay.value = formatNumber(amount.value);
});
watch(krwAmount, () => {
  krwAmountDisplay.value = formatNumber(krwAmount.value);
});
</script>

<style>
.position-absolute {
  position: absolute;
}

.top-0 {
  top: 0;
}

.end-0 {
  right: 0;
}

.m-2 {
  margin: 0.5rem;
}
</style>
