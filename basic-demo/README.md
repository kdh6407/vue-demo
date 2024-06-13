# Vue.js 기초

## 앱 생성

## 템플릿 문법

## 반응형 앱 기초

### ref 함수

> 일반적인 변수 선언을 통해 값을 다루게 될때는 화면의 요소에 값을 표현하는 로직이 필요합니다.
반응형 함수를 통해 값을 변경하기만 해도 화면의 요소가 실시간으로 변화하는 것,
이러한 변화에 반응하여 요소의 내용을 다시 렌더링 해주기 때문에 반응형 앱이라고 합니다.

```html
<template>
    <button @click="count++">
      {{ count }}
    </button>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>
```

### @click 이벤트 처리

> 단순히 값을 조작하는 것 이상의 계산이 필요한 경우는 함수를 작성하고 지정할 수 있습니다.
바로 위 예제에서 count++ 을 통해 직접 조작하는 것이 아닌 count 를 조작하는 함수를 정의하고 button 요소의 click 이벤트에 지정해보겠습니다. 버튼을 누를때마다 2씩 증가하는 함수입니다.

> @click 은 해당 요소를 클릭했을때의 함수를 지정할때 쓰는 문법입니다.
DOM API 의 onclick 이벤트 리스너 지정 방식을 단순화하여 간편하게 사용 가능합니다.

```html
<template>
    <button @click="increment">
      {{ count }}
    </button>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
const increment = () => {
  count.value = count.value + 2;
}
</script>
```

### reactive 함수와 computed 함수

>
> 위 예제보다 더 복잡한 조건을 다루게 될때

### 객체 바인딩 v-bind

> script 에서 정의한 객체들을 template 에서 활용할때는 html 표준 속성 앞에 ```:``` (콜론) 기호를 입력합니다. ```v-bind:``` 도 같은 의미지만 생략 가능합니다.<br>
아래 예시는 div 요소의 class 를 지정하기 위해 isActive 의 참/거짓 여부에 따라 active 라는 class 이름을 정의합니다. 참일때는 class="active", 거짓일때는 빈 클래스입니다.

```html
<template>
  <div :class="{ active: isActive }">안녕하세요!</div>
</template>

<script setup>
  import { ref } from 'vue'
  const isActive = ref(true)
</script>

<style scope>
  .active { color: red }
</style>
```
