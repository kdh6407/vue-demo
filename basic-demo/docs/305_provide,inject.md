## prop 드릴링의 문제점과 해결을 위한 prodive, inject

prop 드릴링이란 데이터를 상위 컴포넌트에서 하위 컴포넌트로 전달하기 위해 중간의 모든 컴포넌트를 거쳐 데이터를 전달하는 방식을 말합니다.

> 복잡성 증가에 따른 유지보수의 어려움 및 데이터 전달 과정에서 거쳐가는 중간 컴포넌트의 불필요한 리렌더링 문제가 있습니다.

```javascript
ParentComponent (prop 전달)
  ├── IntermediateComponent1 (prop 전달, 미사용)
  │    ├── IntermediateComponent2 (prop 전달, 미사용)
  │    │    ├── ChildComponent (prop 사용)
```

`provide`와 `inject`를 사용하면 상위 컴포넌트에서 하위 컴포넌트로 데이터를 `직접 전달`할 수 있어 `prop 드릴링 문제를 해결`할 수 있습니다.

### App.vue (부모컴포넌트 또는 최상위 컴포넌트)

```html
<template>
  <div>
    <p>Provider Component</p>
    <IntermediateComponent />
  </div>
</template>

<script setup>
import { provide } from 'vue'
import IntermediateComponent from './components/InterComponent.vue'

const sharedMessage = '안녕하세요, 자식 컴포넌트!'
provide('sharedMessage', sharedMessage)
</script>
```

```html
<template>
  <div>
    <p>Intermediate Component</p>
    <ChildComponent />
  </div>
</template>

<script setup>
import ChildComponent from './ChildComponent.vue'
</script>
```

> 💡IntermediateComponent1, IntermediateComponent2 는 생략합니다. 다만 IntermediateComponent1, 2 에서는 아무런 전달 코드가 없음을 이해하시면 됩니다.

### ChildComponent.vue

```html
<template>
  <div>
    <p>Child Component</p>
    <p>Received Message: {{ message }}</p>
  </div>
</template>

<script setup>
import { inject } from 'vue'

const message = inject('sharedMessage')
</script>
```