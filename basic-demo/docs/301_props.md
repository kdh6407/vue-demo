## props

부모 컴포넌트가 자식 컴포넌트로 데이터를 전달할 때 사용합니다

> `ParentComponent`에서는 `parentMessage`라는 `ref 변수`를 정의하고, 이를 `ChildComponent`에 `message prop`으로 전달합니다.

> `ChildComponent`에서는 `defineProps`를 사용하여 전달받은 props를 정의하고, message prop을 사용하여 부모 컴포넌트로부터 전달된 메시지를 출력합니다.

### ParentComponent.vue 컴포넌트

```html
<template>
  <div>
    <ChildComponent :message="parentMessage" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const parentMessage = ref('안녕하세요, 자식 컴포넌트!')
</script>
```

### ChildComponent.vue 컴포넌트

```html
<template>
  <div>{{ message }}</div>
</template>

<script setup>
const props = defineProps({
  message: {
    type: String,
    required: true
  }
})
</script>
```
