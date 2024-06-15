## 반응성 (Reactiveness) API 함수

앞서 알아본 ref 함수 외에도 다른 편의성 함수가 제공됩니다. 이를 반응성 API 라고 하며 `reactive` `computed` `watch` 가 있습니다.

### `reactive`
reactive 함수는 배열 또는 객체를 반응형으로 만들 때 사용합니다.

```html
<template>
  <div>
    <p>이름: {{ user.name }}</p>
    <p>나이: {{ user.age }}</p>
    <p>성인 여부: {{ isAdult }}</p>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'

const user = reactive({
  name: '홍길동',
  age: 20
})

const isAdult = computed(() => user.age >= 18)
</script>
```

> 💡 reactive 함수로 만든 반응형 객체를 재할당하면 반응형이 해제됩니다. 객체나 배열의 속성을 수정하는 방식을 통해 반응형 상태를 유지해야합니다.

```html
<template>
  <div>
    <h1>반응형 상태를 잃어버리는 예제</h1>
    <p>사용자 이름: {{ user.name }}</p>
    <button @click="updateUserName">사용자 이름 변경</button>
    <button @click="replaceUser">사용자 객체 교체</button>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const user = reactive({
  name: '홍길동',
  age: 25
});

const updateUserName = () => {
  // user의 반응형 유지됨
  user.name = '이순신';
};

const replaceUser = () => {
  // user의 반응형 잃어버림
  user = {
    name: '강감찬',
    age: 30
  };
  
  // 아래 코드로는 반응형이 유지됨 (위 아래 코드의 주석을 반전해서 테스트)
  // Object.assign(user, {
  //   name: '강감찬',
  //   age: 30
  // });
};
</script>

<style scoped>
button {
  margin: 5px;
}
</style>
```

### `computed`

다음 예제에서 `computed` 함수는 특정 데이터에 의존하여 자동으로 계산되는 값을 정의할 때 사용합니다. `computed` 는 일종의 `ref` 계산 처리 버전이라고 볼 수 있습니다.

```html
<template>
  <div>
    <h1>계산기</h1>
    <input v-model.number="number1" placeholder="숫자 1" />
    <input v-model.number="number2" placeholder="숫자 2" />
    <p>덧셈: {{ sum }}</p>
    <p>뺄셈: {{ difference }}</p>
    <p>곱셈: {{ product }}</p>
    <p>나눗셈: {{ quotient }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const number1 = ref(0);
const number2 = ref(0);

const sum = computed(() => number1.value + number2.value);
const difference = computed(() => number1.value - number2.value);
const product = computed(() => number1.value * number2.value);
const quotient = computed(() => {
  return number2.value !== 0 ? (number1.value / number2.value).toFixed(2) : '나눗셈 불가';
});
</script>
```

이어지는 예제에서 `watch` 함수는 특정 데이터를 의존하여 해당 값이 변경되면 반응하는 동작을 정의할 수 있습니다.

```html
<template>
  <div>
    <h1>watch 예제</h1>
    <input v-model="inputValue" placeholder="입력 값을 변경하세요" />
    <p>입력 값: {{ inputValue }}</p>
    <p>대문자 변환: {{ uppercaseValue }}</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const inputValue = ref('');
const uppercaseValue = ref('');

watch(inputValue, (newValue) => {
  uppercaseValue.value = newValue.toUpperCase();
});
</script>

<style scoped>
input {
  margin: 5px;
}
</style>
```

또는 연쇄 작용이 필요한 경우에도 활용이 가능합니다. 아래 예제에서 입력값인 `initialValue` 가 변하면 `watch` 를 통해 `doubledValue`를 변경하고 이어서 `tripledValue` 가 변경됩니다.

```html
<template>
  <div>
    <h1>watch 체이닝 예제</h1>
    <input v-model="initialValue" placeholder="초기 값을 입력하세요" />
    <p>초기 값: {{ initialValue }}</p>
    <p>두 배 값: {{ doubledValue }}</p>
    <p>세 배 값: {{ tripledValue }}</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const initialValue = ref(0);
const doubledValue = ref(0);
const tripledValue = ref(0);

watch(initialValue, (newValue) => {
  doubledValue.value = newValue * 2;
});

watch(doubledValue, (newValue) => {
  tripledValue.value = newValue * 1.5;
});
</script>

<style scoped>
input {
  margin: 5px;
}
</style>
```

💡 watch 함수를 통해 비밀번호 입력을 검증하는 예제를 입력하고 실행해보겠습니다.

```html
<template>
  <div>
    <h1>비밀번호 검증 예제</h1>
    <input type="password" v-model="oldPassword" placeholder="이전 비밀번호" />
    <input type="password" v-model="newPassword" placeholder="새 비밀번호" />
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const oldPassword = ref('');
const newPassword = ref('');
const message = ref('');

watch([oldPassword, newPassword], ([newOldPassword, newNewPassword]) => {
  if (newNewPassword === '') {
    message.value = '';
  } else if (newOldPassword === newNewPassword) {
    message.value = '새 비밀번호는 이전 비밀번호와 일치합니다.';
  } else {
    message.value = '새 비밀번호는 이전 비밀번호와 다릅니다.';
  }
});
</script>

<style scoped>
input {
  margin: 5px;
  display: block;
}
</style>
```

### `watchEffect`

watchEffect는 watch와 달리 추적할 데이터를 명시적으로 지정할 필요가 없으며, 내부에서 사용된 모든 반응형 상태를 자동으로 추적합니다.

> 다음 예제에서 watchEffect는 firstName이나 lastName이 변경될 때마다 자동으로 실행되며, fullName 값을 업데이트합니다.

```html
<template>
  <div>
    <h1>watchEffect 예제</h1>
    <input v-model="firstName" placeholder="이름을 입력하세요" />
    <input v-model="lastName" placeholder="성을 입력하세요" />
    <p>전체 이름: {{ fullName }}</p>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

const firstName = ref('');
const lastName = ref('');
const fullName = ref('');

watchEffect(() => {
  fullName.value = `${firstName.value} ${lastName.value}`;
});
</script>

<style scoped>
input {
  display: block;
  margin: 5px 0;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}
</style>
```

