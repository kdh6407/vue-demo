## v-model 로 부모/자식 컴포넌트 간 데이터 동기화

> v-model은 기본적으로 modelValue라는 prop과 update:modelValue라는 이벤트를 사용합니다. 자식 컴포넌트에서 v-model을 사용하려면 modelValue라는 prop과 update:modelValue 이벤트를 사용해야 합니다.

간단한 예제를 통해 확인해보겠습니다.

### App.vue (부모 컴포넌트)

```html
<template>
  <div>
    <p>Parent Component</p>
    <input v-model="parentMessage" placeholder="여기에 입력하세요" />
    <ChildComponent v-model="parentMessage" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChildComponent from './components/ChildComponent.vue'

const parentMessage = ref('초기 메시지')
</script>
```

### ChildComponent.vue (자식 컴포넌트)

```html
<template>
  <div>
    <p>Child Component</p>
    <input v-model="modelValue" placeholder="여기에 입력하세요" />
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps({
  modelValue: String
})
const emit = defineEmits(['update:modelValue'])

const modelValue = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  modelValue.value = newValue
})

watch(modelValue, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>
```

추가로 v-model을 사용한 양방향 데이터 바인딩 기법으로 사용자 입력 폼을 입력 받을때 부모 컴포넌트에서 내용을 보여주도록 처리하는 예제를 입력하고 실행해보겠습니다.

### App.vue (부모 컴포넌트)

```html
<template>
  <div>
    <h1>사용자 입력 폼</h1>
    <UserForm v-model="formData" />
    <p>입력된 이름: {{ formData.name }}</p>
    <p>입력된 이메일: {{ formData.email }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UserForm from './components/UserForm.vue'

const formData = ref({
  name: '',
  email: ''
})
</script>
```

> 자식 컴포넌트는 defineProps 를 통해 modelValue 라는 이름으로 부모에서 v-model

### UserForm.vue (자식 컴포넌트)

```html
<template>
  <div>
    <label>
      이름:
      <input v-model="internalData.name" placeholder="이름 입력" />
    </label>
    <label>
      이메일:
      <input v-model="internalData.email" placeholder="이메일 입력" />
    </label>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])

const internalData = ref({ ...props.modelValue })

watch(() => props.modelValue, (newValue) => {
  if (newValue !== internalData.value) {
    internalData.value = { ...newValue }
  }
}, { deep: true })

watch(internalData, (newValue) => {
  if (newValue !== props.modelValue) {
    emit('update:modelValue', newValue)
  }
}, { deep: true })
</script>
```