# Vue.js 로 웹앱 만들기

## Node.js 소개 및 설치

> Vue 를 통해 웹앱 개발을 시작하기 전에 Node.js를 설치해야 합니다. Node.js는 JavaScript 런타임으로, 서버 측 개발과 빌드 도구를 실행하는 데 사용됩니다. Vue 프로젝트 생성 및 관리를 위한 개발 도구는 Node.js 환경에서 실행되기 때문에 반드시 설치해야 합니다.

### Node.js 설치 (윈도우 11)

1. [Node.js 공식 웹사이트](https://nodejs.org)로 이동하여 LTS(Long Term Support) 버전을 다운로드합니다.
2. 다운로드한 설치 파일을 실행하고 기본 설치 관리자의 옵션을 따라 설치를 완료합니다.
3. 설치가 완료되면 명령 프롬프트를 열고 다음 명령어를 입력하여 설치를 확인합니다.
    ```sh
    node -v
    ```

## 앱 생성

> Vue 프로젝트를 생성하기 위해 Yarn을 사용할 것입니다. Yarn은 빠르고 안정적인 패키지 관리자 중 하나입니다. Yarn을 사용하기 위해서는 Node.js 의 Corepack 을 활성화하고, Vite를 사용하여 Vue 프로젝트를 생성하는 방법을 알아보겠습니다.

1. Corepack 활성화

    Corepack은 Node.js에서 패키지 관리자를 쉽게 사용할 수 있도록 도와줍니다. Corepack을 활성화하면 Yarn을 사용할 수 있습니다.

    ```sh
    corepack enable
    ```

2. Yarn을 사용하여 새로운 프로젝트 생성

    ```sh
    yarn create vite my-project --template vue
    ```

3. 프로젝트 폴더로 이동

    ```sh
    cd my-project
    ```

4. 종속성 설치

    ```sh
    yarn
    ```

5. 개발 서버 실행

    ```sh
    yarn dev
    ```

## 💡 SFC (Single File Component)의 개념

SFC는 하나의 파일에 템플릿, 스크립트, 스타일을 모두 포함하는 방식으로 작성됩니다. `템플릿 섹션`에는 화면에 배치될 요소를 작성하고, `스크립트 섹션`에는 로직과 데이터 관리를, `스타일 섹션`에는 해당 컴포넌트의 스타일을 작성합니다. 각 섹션의 `순서는 자유`롭게 배치할 수 있습니다.

### 샘플 프로젝트 둘러보기

처음 생성한 프로젝트의 폴더를 둘러보겠습니다.

#### package.json 파일

> `package.json` 파일은 프로젝트에 대한 메타데이터와 의존성 정보를 포함하고 있습니다. 프로젝트의 이름, 버전, 스크립트 명령어, 의존성 목록 등이 이 파일에 정의되어 있습니다. 예를 들어, `dev` 스크립트는 `vite` 명령어를 실행하여 개발 서버를 시작합니다.

#### vite.config.js 파일

> `vite.config.js` 파일은 Vite 설정 파일입니다. 이 파일을 통해 프로젝트의 빌드 및 개발 서버 설정을 커스터마이징할 수 있습니다. 예를 들어, 별칭 설정, 플러그인 추가, 서버 포트 설정 등을 이 파일에서 구성할 수 있습니다.

#### node_modules 폴더

> `node_modules` 폴더는 프로젝트에서 사용하는 모든 의존성 패키지들이 설치되는 디렉토리입니다. 의존성이란 프로젝트에서 사용하는 확장 기능들을 의미합니다.

#### assets 폴더

> `assets` 폴더는 이미지, 폰트, 비디오와 같은 정적 파일을 저장하는 디렉토리입니다. Vue 컴포넌트에서 이러한 파일들을 쉽게 참조하고 사용할 수 있습니다.

#### components 폴더

> `components` 폴더는 Vue 컴포넌트를 저장하는 디렉토리입니다. 기본적으로 `HelloWorld.vue`라는 예제 컴포넌트가 포함되어 있으며, 필요한 컴포넌트를 추가하여 사용할 수 있습니다.

#### .gitignore 파일

> `.gitignore` 파일은 Git이 버전 관리에서 무시해야 할 파일 및 디렉토리를 정의합니다. 일반적으로 `node_modules`, 빌드 결과물, 환경설정 파일 등이 있습니다

#### 그 밖의 파일

> 그 밖에도 프로젝트의 루트 디렉토리에는 다양한 설정 파일이 존재할 수 있습니다. 예를 들어, `index.html` 파일은 웹앱의 진입점 역할을 하며, `README.md` 파일은 프로젝트에 대한 설명과 사용 방법을 문서화합니다.

## 💡 템플릿 문법

Vue의 템플릿 문법을 통해 데이터를 화면에 렌더링하고 사용자와 상호작용할 수 있습니다. 가장 기본적인 템플릿 문법으로는 데이터 바인딩, 디렉티브, 이벤트 처리 등이 있습니다.

### 데이터 바인딩

> 데이터 바인딩을 통해 JavaScript 변수와 템플릿을 연결할 수 있습니다. 이때 `{{ }}` 문법을 사용합니다.

```html
<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
const message = '안녕하세요, Vue!'
</script>
```

> 데이터 바인딩 시에는 JavaScript 표현식도 넣을 수 있습니다

```html
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div :id="`list-${id}`"></div>
```

### 디렉티브

디렉티브는 Vue 템플릿에 특수한 동작을 적용할 수 있는 기능입니다. `v-if`, `v-for`, `v-bind`, `v-model` 등이 있습니다.

#### `v-if` 조건부 렌더링

v-if 디렉티브를 사용하여 조건부로 요소를 렌더링합니다.

> 예시에는 없지만 `v-else-if` 구문도 있습니다.

```html
<template>
  <div>
    <p v-if="isVisible">이 문장은 보입니다</p>
    <p v-else>이 문장은 보이지 않습니다</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isVisible = ref(true)
</script>
```

### `v-show`

화면 요소의 표시 여부가 자주 바뀌는 경우라면 v-show 를 사용하는 방법도 있습니다. 단일 요소의 표시 여부만 관리합니다.

```html
<template>
  <div>
    <button @click="toggleVisibility">토글</button>
    <p v-show="isVisible">이 문장은 조건에 따라 표시됩니다.</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isVisible = ref(true);

const toggleVisibility = () => {
  isVisible.value = !isVisible.value;
};
</script>
```


### `v-for`

v-for 디렉티브를 사용하여 리스트를 렌더링합니다.

> `:key` 요소는 중복되지 않는 고유값을 반드시 넣어주어야 Vue.js 내에서 표시되는 요소를 효율적으로 관리할 수 있습니다. 보통 중복되지 않는 고유값 (없다면 배열의 인덱스를 활용) 을 지정합니다

```html
<template>
  <ul>
    <li v-for="item in items" :key="item.id">{{ item.name }}</li>
  </ul>
  <span v-for="n in 10">{{ n }}</span>
</template>

<script setup>
const items = [
  { id: 1, name: '아이템 1' },
  { id: 2, name: '아이템 2' },
  { id: 3, name: '아이템 3' }
]
</script>
```

### `v-bind`

템플릿에서 객체를 바인딩할 때는 `:` 또는 `v-bind:`를 사용합니다. 예를 들어, `:class`를 사용하여 클래스 이름을 동적으로 지정할 수 있습니다.

> class 값을 바인딩하는 예제입니다. isActive 값이 참일때 'active' 라는 클래스 이름을 지정해줍니다.

```html
<template>
  <div :class="{ 'active': isActive }">안녕하세요!</div>
</template>

<script setup>
import { ref } from 'vue'
const isActive = ref(true)
</script>

<style scoped>
  .active { color: red }
</style>
```

### v-model

> `v-model` 디렉티브를 사용하여 양방향 바인딩을 구현할 수 있습니다.

```html
<template>
  <input v-model="inputValue" placeholder="텍스트를 입력하세요">
  <p>입력한 값: {{ inputValue }}</p>
</template>

<script setup>
import { ref } from 'vue'

const inputValue = ref('')
</script>
```

## 반응형 앱 기초

반응형 앱은 데이터가 변경될 때마다 화면이 자동으로 업데이트되는 앱을 의미합니다. Vue에서는 이러한 반응성을 쉽게 구현할 수 있도록 다양한 기능을 제공합니다.

### `ref` 함수

> ref 함수를 통해 반응형 데이터를 선언하고 사용할 수 있습니다. 반응형 데이터는 값이 변경될 때마다 자동으로 화면에 반영됩니다.

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

### `@click` 이벤트 디렉티브

> 더 복잡한 로직이 필요한 경우 함수를 정의하고 이벤트에 연결할 수 있습니다. @click 디렉티브는 요소를 클릭했을 때 실행할 함수를 지정합니다.

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

## 이벤트 디렉티브

앞전 예제에서 알아본 @click 이외에도 여러 이벤트 디렉티브가 있습니다. `@change` `@input` `@scroll` 등이 있습니다.

> 이벤트 디렉티브는 `v-on:` 또는 줄여서 `@`를 사용합니다.

### `@change` 이벤트 디렉티브 및 v-model.lazy

@change 디렉티브는 입력 요소의 값이 변경되었을 때 발생합니다. 주로 input, select, textarea 요소에서 사용됩니다.

> 입력 요소에 대한 포커스를 잃을 때 이벤트가 발생합니다.

```html
<template>
  <!-- @change 디렉티브를 사용 -->
  <div>
    <label for="username">아이디:</label>
    <input type="text" id="username" @change="handleChange">
    <p>입력한 아이디: {{ username }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');

const handleChange = (event) => {
  username.value = event.target.value;
};
</script>
```

값의 변화를 실시간으로 화면에 반영한다면 v-model.lazy 를 사용하면 좋습니다.

```html
<template>
  <!-- @change 디렉티브를 v-model.lazy 로 구현하기 -->
  <div>
    <label for="username">아이디:</label>
    <input type="text" id="username" v-model.lazy="username">
    <p>입력한 아이디: {{ username }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
</script>
```

### `@input` 이벤트 디렉티브 및 v-model

@input 디렉티브는 사용자가 입력 요소의 값을 변경할 때마다 발생합니다. 주로 `input`, `textarea` 요소에서 사용됩니다.

> `@input` 은 키 입력이 발생하는 즉시 이벤트가 발생합니다.<br>

> @change 예제에서 change 를 input 으로 변경하고 확인합니다.<br>
v-model.lazy 에서 .lazy 를 제거하면 같은 방식으로 동작합니다.

### `@keyup` 이벤트 디렉티브 및 수식어

키보드 이벤트를 처리할때 특정 키를 확인해야 하는 경우에 유용합니다.

> 다음 예제는 엔터키에 대해서만 이벤트를 처리합니다.

```html
<template>
  <div>
    <input v-model="inputValue" @keyup.enter="submitInput" placeholder="Enter 키를 눌러 제출"/>
    <p>제출 값: {{ submitValue }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const inputValue = ref('');
const submitValue = ref('');

const submitInput = () => {
  alert(`입력한 값: ${inputValue.value}`);
  submitValue.value = inputValue.value;
};
</script>
```

> 예제를 입력하고 실행한 이후에 keyup.ctrl.enter, keyup.alt.enter, keyup.shift.enter 로 바꾸면 각각 컨트롤+엔터, 알트+엔터, 쉬프트+엔터를 눌러야 이벤트에 반응합니다.

> 다음 예제는 마우스 오른쪽 버튼을 클릭할때의 이벤트 처리입니다.

```html
<template>
  <div @click.right.prevent="handleRightClick">
    오른쪽 클릭하세요. {{ count }}
  </div>
</template>

<script setup>
import { ref } from 'vue';

const count = ref(0);

const handleRightClick = (event) => {
  alert('오른쪽 클릭 이벤트 발생');
  count.value++;
};
</script>
```

## 이벤트 디렉티브의 주요 이벤트 수식어

### `.prevent`

`@click` 디렉티브와 같은 이벤트 디렉티브 외에도 다양한 편의 기능을 제공하여 이벤트를 간편하게 처리할 수 있습니다. 예를 들어, `@click.prevent`는 클릭 이벤트가 발생했을 때 기본 동작을 방지합니다.

> 폼 전송 시 기본 동작 이벤트는 폼 내용을 전송하면서 화면을 이동시킵니다. SPA 에서는 이러한 화면의 새로고침을 방지하기 해서 주로 사용합니다.

```html
<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="inputValue" />
    <button type="submit">제출</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const inputValue = ref('')
const handleSubmit = () => {
  console.log(inputValue.value)
}
</script>
```

### `.once`

이벤트를 한번만 처리하기 위한 수식어입니다. 이벤트 발생 즉시 핸들러를 제거합니다.

```html
<template>
  <button @click.once="handleClick">클릭하세요</button>
</template>

<script setup>
const handleClick = () => {
  alert('이 버튼은 한 번만 클릭할 수 있습니다.')
}
</script>
```

### `.stop`

이벤트 전파를 중단하는 `.stop` 수식어입니다. 아래 예제에서는 클릭 이벤트가 상위 요소로 전파되지 않도록 합니다.
아래 예제에서 .stop 수식어를 제거하면 내부 버튼을 누를때 외부 요소도 함께 이벤트가 발생합니다.

> 자식 요소에서 부모 요소로 이벤트가 전이되는 것을 `이벤트 버블링`이라고 하며 이러한 이벤트의 `부작용(side-effect) 방지`를 쉽게할수 있습니다.

> 다음 예제에서는 `내부 버튼`을 클릭해도 `외부 요소`의 클릭 이벤트는 발생하지 않습니다.

```html
<template>
  <div @click="handleOuterClick" style="padding: 20px; border: 1px solid black;">
    외부 요소
    <button @click.stop="handleInnerClick" style="margin-top: 10px;">내부 버튼</button>
  </div>
</template>

<script setup>
const handleOuterClick = () => {
  alert('외부 요소가 클릭되었습니다!')
}

const handleInnerClick = () => {
  alert('내부 버튼이 클릭되었습니다!')
}
</script>
```

> stop 을 활용하는 구체적인 예시를 하나 더 실행해보겠습니다. 모달 창을 활용할때 모달 창 내의 내용을 클릭하는 경우에는 창이 닫힘을 방지하기 위해서도 사용합니다.

```html
<template>
  <div>
    <button @click="showModal = true">모달 열기</button>
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h2>모달 창</h2>
        <p>모달 창 내용입니다.</p>
        <button @click="closeModal">모달 닫기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showModal = ref(false)

const closeModal = () => {
  showModal.value = false
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
}
</style>
```

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


## 컴포넌트 라이프사이클 제어

화면에 컴포넌트가 표시, 변경, 제거될때 등의 이벤트를 처리하기 위한 요소입니다. 대표적으로 컴포넌트가 화면에 표시 완료된 시점에 첫 동작을 하기 위해 `onMounted` 를 사용합니다.

> 일반적으로 화면이 열린 이후 특정 조회 요청을 처리하고자 할때 사용합니다. 아래 예제에서 `onMounted` 내의 fetchPosts() 를 삭제하면 조회되지 않습니다.

```html
<template>
  <div>
    <h1>onMounted 예제</h1>
    <p v-if="loading">로딩 중...</p>
    <ul v-else>
      <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const posts = ref([]);
const loading = ref(true);

const fetchPosts = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    posts.value = data;
  } catch (error) {
    console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchPosts();
});
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  background: #f4f4f4;
  margin: 5px 0;
  padding: 10px;
  border: 1px solid #ddd;
}
</style>
```

> 그 밖에 `onUpdated` `onUnmounted` `onBeforeMount` `onBeforeUpdate` `onBeforeUnmount` 가 제공됩니다. 각각의 화면 요소, 데이터 준비, 처리 시점 등 상황에 맞춰 사용할 수 있습니다.

> 예를 들어 `onBeforeMount`는 onMounted보다 앞서 API 데이터를 조회하고 부가적인 데이터를 화면 요소가 그려지기 전에 사용합니다. 위 예제를 onBeforeMount로 변경해도 마찬가지로 동작합니다.

> `onUnmounted`는 컴포넌트가 DOM에서 제거될 때 필요한 정리 작업(예: 타이머 정리, 이벤트 리스너 해제 등)을 수행하는 데 유용합니다

> `onUpdated` 의 경우 비동기 처리 시에는 아래 예제처럼 `nextTick()` 을 활용하는 것을 권장합니다. `nextTick`은 화면 요소의 변화 발생 시 발생 작업 직후를 기다리게 하는 함수 입니다.

```html
<template>
  <button id="counter" @click="increment">{{ count }}</button>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const count = ref(0)

async function increment() {
  count.value++

  // DOM 갱신 전
  console.log(document.getElementById('counter').textContent) // 0

  await nextTick()
  // DOM 갱신 후
  console.log(document.getElementById('counter').textContent) // 1
}
</script>
```