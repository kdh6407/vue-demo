## emit

자식 컴포넌트가 부모 컴포넌트로 이벤트를 전달할 때 사용합니다.

> `ParentComponent`에서는 `@customEvent`를 사용하여 `ChildComponent`에서 발생한 `customEvent`를 처리하는 handleCustomEvent 함수를 정의합니다.

> `ChildComponent`에서는 `defineEmits`를 사용하여 `customEvent` 이벤트를 정의하고, 버튼 클릭 시 emitCustomEvent 함수를 통해 customEvent를 발생시킵니다. 이때 이벤트와 함께 '이벤트 데이터'라는 내용을 전달합니다.

### ParentComponent.vue 컴포넌트

```html
<template>
  <div>
    <ChildComponent @customEvent="handleCustomEvent" />
    <p>받은 데이터: {{ receivedData }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const receivedData = ref('')

const handleCustomEvent = (payload) => {
  receivedData.value = payload
}
</script>
```

### ChildComponent.vue 컴포넌트

```html
<template>
  <button @click="emitCustomEvent">이벤트 발생</button>
</template>

<script setup>
const emit = defineEmits(['customEvent'])

const emitCustomEvent = () => {
  emit('customEvent', '이벤트 데이터')
}
</script>
```
