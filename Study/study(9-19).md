# React 학습 정리 — 2026-09-19

## 📌 학습 키워드

- 함수형 컴포넌트
- useEffect Hook
- 의존성 배열(Dependency Array)
- useState
- fetch()
- 로컬 JSON
- public 폴더
- JSON 데이터 처리
- map()

---

# 함수형 컴포넌트와 useEffect 훅

## 1. 함수형 컴포넌트

React에서 **함수형 컴포넌트는 JavaScript 함수로 작성하는 컴포넌트**다.

```jsx
function App() {
  return <h2>Hello React</h2>;
}

export default App;
```

함수가 JSX를 반환하고, React가 반환된 JSX를 화면에 렌더링한다.

```text
함수형 컴포넌트
      ↓
   JSX 반환
      ↓
React가 화면에 렌더링
```

---

## 2. `useEffect` 훅

`useEffect`는 **컴포넌트가 렌더링된 후 특정 작업(부수 효과)을 실행할 때 사용하는 Hook**이다.

```jsx
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    console.log('렌더링 후 실행');
  });

  return <h2>Hello React</h2>;
}
```

### 대표적인 사용 목적

* 서버에서 데이터 가져오기
* 타이머 실행
* 이벤트 등록 및 해제
* DOM 조작
* 렌더링 이후 실행해야 하는 작업

---

## 3. 의존성 배열에 따른 `useEffect` 실행

`useEffect`의 두 번째 인자인 **의존성 배열(dependency array)**에 무엇을 넣느냐에 따라 실행 시점이 달라진다.

### ① 의존성 배열이 없는 경우

```jsx
useEffect(() => {
  console.log('실행');
});
```

**렌더링될 때마다 실행**된다.

```text
최초 렌더링 → 실행
      ↓
상태 변경
      ↓
리렌더링 → 실행
      ↓
상태 변경
      ↓
리렌더링 → 실행
...
```

---

### ② 빈 배열 `[]`

```jsx
useEffect(() => {
  console.log('실행');
}, []);
```

**최초 렌더링 후 실행**되고, 이후 일반적인 리렌더링에서는 다시 실행되지 않는다.

```text
최초 렌더링 → 실행
      ↓
상태 변경 → 리렌더링 → 실행 ❌
      ↓
상태 변경 → 리렌더링 → 실행 ❌
```

> 개발 환경의 React Strict Mode에서는 개발 중 효과가 추가로 실행되는 것처럼 보일 수 있다.

---

### ③ 특정 값을 넣는 경우

```jsx
useEffect(() => {
  console.log('실행');
}, [count]);
```

**최초 렌더링 후 한 번 실행되고, 이후 `count`가 변경될 때마다 실행**된다.

```text
최초 렌더링 → 실행
      ↓
count 변경 → 리렌더링 → 실행
      ↓
count 변경 → 리렌더링 → 실행

name 변경 → 리렌더링 → 실행 ❌
```

여러 값을 넣을 수도 있다.

```jsx
useEffect(() => {
  console.log('실행');
}, [count, name]);
```

`count` 또는 `name`이 변경되면 실행된다.

---

## 4. 실행 시점 정리

| 작성 방법 | 실행 시점 |
|---|---|
| `useEffect(() => {})` | 렌더링마다 |
| `useEffect(() => {}, [])` | 최초 렌더링 후 |
| `useEffect(() => {}, [count])` | 최초 실행 + `count` 변경 시 |
| `useEffect(() => {}, [count, name])` | 최초 실행 + `count` 또는 `name` 변경 시 |

**핵심은 의존성 배열에 있는 값이 변경되었는지를 React가 비교한다는 것**이다.

---

## 5. `useState`와 `useEffect` 함께 사용하기

```jsx
import { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('count:', count);
  }, [count]);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

### 동작 과정

```text
버튼 클릭
   ↓
setCount()
   ↓
count 변경
   ↓
컴포넌트 리렌더링
   ↓
count가 의존성 배열의 값과 변경되었는지 확인
   ↓
useEffect 실행
```

---

## 6. `useState`와 `useEffect`의 차이

```text
useState
   ↓
상태 관리
   ↓
상태가 변경되면 리렌더링


useEffect
   ↓
렌더링 이후 부수 효과 처리
   ↓
의존성 배열에 따라 실행 여부 결정
```

### 핵심 정리

* **함수형 컴포넌트** → JavaScript 함수로 작성한 React 컴포넌트
* **`useState`** → 컴포넌트의 상태를 관리
* **`useEffect`** → 렌더링 이후 부수 효과를 처리
* **의존성 배열 없음** → 렌더링마다 실행
* **`[]`** → 최초 렌더링 후 실행
* **`[값]`** → 최초 실행 + 해당 값이 변경될 때 실행
* 의존성 배열의 값이 변경되지 않으면 `useEffect`는 다시 실행되지 않는다.

# 로컬 JSON 파일과 통신

## 1. 로컬 JSON 파일

React에서 데이터를 별도의 JSON 파일에 저장하고 `fetch()`를 이용해 가져올 수 있다.

Vite 프로젝트에서는 `public` 폴더에 JSON 파일을 만들어 사용할 수 있다.

```text
vite-project/
├── public/
│   └── data.json
├── src/
│   └── App.jsx
└── package.json
```

### `data.json`

```json
[
  {
    "id": 1,
    "name": "홍길동",
    "age": 20
  },
  {
    "id": 2,
    "name": "김철수",
    "age": 25
  }
]
```

---

## 2. `fetch()`를 이용해 JSON 가져오기

```jsx
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(result => {
        setData(result);
      });
  }, []);

  return (
    <div>
      {data.map(item => (
        <p key={item.id}>
          {item.name} / {item.age}세
        </p>
      ))}
    </div>
  );
}

export default App;
```

---

## 3. 코드의 동작 과정

```text
컴포넌트 렌더링
      ↓
useEffect 실행
      ↓
fetch('/data.json')
      ↓
JSON 파일 요청
      ↓
response.json()
      ↓
JSON 데이터를 JavaScript 객체/배열로 변환
      ↓
setData(result)
      ↓
state 변경
      ↓
컴포넌트 리렌더링
      ↓
화면에 데이터 출력
```

---

## 4. 주요 코드 이해하기

### `useState`

```jsx
const [data, setData] = useState([]);
```

JSON에서 가져온 데이터를 저장할 state를 만든다.

* `data` → 현재 저장된 데이터
* `setData` → 데이터 변경 함수
* `[]` → 처음에는 빈 배열

---

### `useEffect`

```jsx
useEffect(() => {
  // JSON 데이터 가져오기
}, []);
```

`[]`를 사용했기 때문에 **컴포넌트가 처음 렌더링된 후 한 번 실행**한다.

JSON 데이터를 가져오는 작업은 렌더링 이후 수행하는 작업이므로 `useEffect`에서 처리한다.

---

### `fetch()`

```jsx
fetch('/data.json')
```

`public` 폴더에 있는 `data.json` 파일에 요청한다.

---

### `response.json()`

```jsx
.then(response => response.json())
```

서버 또는 JSON 파일에서 받은 응답의 본문을 **JavaScript에서 사용할 수 있는 데이터로 파싱**한다.

---

### `setData()`

```jsx
.then(result => {
  setData(result);
});
```

변환된 JSON 데이터를 React의 state에 저장한다.

state가 변경되면 React가 다시 렌더링한다.

---

## 5. 데이터를 화면에 출력하기

JSON 데이터가 배열이므로 `map()`을 사용한다.

```jsx
{data.map(item => (
  <p key={item.id}>
    {item.name} / {item.age}세
  </p>
))}
```

* `map()` → 배열의 각 요소를 순회
* `item` → 현재 순회 중인 데이터
* `key` → React가 각 요소를 구분하기 위한 값
* JSX 안의 `{item.name}`, `{item.age}`를 이용해 데이터를 화면에 출력

---

## 📌 오늘 학습 정리

오늘은 React의 **함수형 컴포넌트와 useEffect Hook의 실행 방식**, **의존성 배열에 따른 효과 실행 시점**, 그리고 **useState와 함께 데이터를 관리하는 방법**을 학습했다.

또한 Vite의 `public` 폴더에 로컬 JSON 파일을 저장하고 `fetch()`로 데이터를 가져온 뒤, `response.json()`으로 파싱하고 `setData()`로 state에 저장하여 화면에 출력하는 흐름을 정리했다.

특히 **렌더링 → useEffect → fetch → JSON 파싱 → state 변경 → 리렌더링 → 화면 출력**의 흐름을 이해하는 것이 핵심이다.
