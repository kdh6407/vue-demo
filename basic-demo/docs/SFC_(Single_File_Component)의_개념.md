## 💡 SFC (Single File Component)의 개념

SFC는 하나의 파일에 템플릿, 스크립트, 스타일을 모두 포함하는 방식으로 작성됩니다. `템플릿 섹션`에는 화면에 배치될 요소를 작성하고, `스크립트 섹션`에는 로직과 데이터 관리를, `스타일 섹션`에는 해당 컴포넌트의 스타일을 작성합니다. 각 섹션의 `순서는 자유`롭게 배치할 수 있습니다.

```html
<template>
  <!-- html 코드 -->
</template>

<script setup>
  //자바스크립트 코드
</script>

<style scoped>
  /* CSS 코드 */
</style>
```
