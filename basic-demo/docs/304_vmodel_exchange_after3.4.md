## Vue 3.4 버전 이후 props/emit 교환

Vue.js 3.4 이후 버전을 통해 개발할때는 앞선 props, emit 등을 좀 더 간편하게 아래처럼 v-model 을 사용하여 구현할 수 있습니다.

```html
<template>
  <div>
    <h1>책 제목: {{ bookTitle }}</h1>
    <MyComponent v-model="bookTitle" />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import MyComponent from './components/MyComponent.vue';

const bookTitle = ref('');
</script>
```

```html
<template>
  <div>
    <label for="title">책 제목 입력:</label>
    <input id="title" v-model="model" />
  </div>
</template>

<script setup>
const model = defineModel()
</script>
```

> 여러개의 내용을 다룰 때는 아래처럼 합니다.

```html
<template>
  <div>
    <h1>책 제목: {{ bookTitle }}</h1>
    <h2>책 저자: {{ bookAuthor }}</h2>
    <ChildDefineModel v-model:title="bookTitle" v-model:author="bookAuthor" />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import ChildDefineModel from './ChildDefineModel.vue';

const bookTitle = ref('');
const bookAuthor = ref('');
</script>
```

```html
<template>
  <div>
    <label for="title">책 제목 입력:</label>
    <input id="title" v-model="title" />

    <label for="author">책 저자 입력:</label>
    <input id="author" v-model="author" />
  </div>
</template>

<script setup>
const title = defineModel('title', { required: true }); //반드시 필요한 값을 지정할때
const author = defineModel('author');
</script>
```
