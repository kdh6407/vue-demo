## 자식 컴포넌트에 내용을 삽입하는 Slot

부모 컴포넌트가 자식 컴포넌트에 콘텐츠를 삽입하는 문법입니다. 슬롯은 자식 컴포넌트 내부에서 부모 컴포넌트에서 전달된 콘텐츠가 표시될 자리 역할을 하며, 부모 컴포넌트에서 제공한 콘텐츠가 그 자리에 삽입됩니다.

> 컴포넌트의 내용이 고정적인 것과 유동적으로 변경될 요소들이 필요한 경우 활용할 수 있습니다.

### 기본 슬롯 (Default Slot)

기본 슬롯은 자식 컴포넌트에서 `slot` 요소를 사용하여 정의할 수 있습니다.

**부모 컴포넌트: ParentComponent.vue**

```html
<template>
  <ChildComponent>
    <p>기본 슬롯 전달</p>
  </ChildComponent>
</template>

<script setup>
import ChildComponent from './ChildComponent.vue';
</script>
```

**자식 컴포넌트: ChildComponent.vue**

```html
<template>
  <div>
    <slot>기본</slot>
  </div>
</template>
```

### 자리 지정 슬롯 (Named Slots)

`name` 속성을 사용하여 여러 개의 슬롯을 정의하고 배치할 수 있습니다.

**부모 컴포넌트: ParentComponent.vue**

```html
<template>
  <ChildComponent>
    <template v-slot:header>
      <h1>헤더</h1>
    </template>
    <template v-slot:footer>
      <p>푸터</p>
    </template>
  </ChildComponent>
</template>

<script setup>
import ChildComponent from './ChildComponent.vue';
</script>
```

**자식 컴포넌트: ChildComponent.vue**

```html
<template>
  <div>
    <header>
      <slot name="header">헤더</slot>
    </header>
    <main>
      <slot>콘텐츠</slot>
    </main>
    <footer>
      <slot name="footer">푸터</slot>
    </footer>
  </div>
</template>
```

### 범위 슬롯 (Scoped Slots)

범위 슬롯은 자식 컴포넌트가 슬롯 콘텐츠에 데이터를 전달할 수 있도록 합니다.

**부모 컴포넌트: ParentComponent.vue**

```html
<template>
  <ChildComponent>
    <template v-slot:default="slotProps">
      <p>{{ slotProps.message }}</p>
    </template>
  </ChildComponent>
</template>

<script setup>
import ChildComponent from './ChildComponent.vue';
</script>
```

**자식 컴포넌트: ChildComponent.vue**

```html
<template>
  <div>
    <slot :message="message"></slot>
  </div>
</template>

<script setup>
const message = '안녕하세요! 이것은 범위 슬롯입니다.';
</script>
```
