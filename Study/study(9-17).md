# React 학습 정리 — 2026-09-17

## 📌 학습 키워드

- State
- Style / Image
- Form 값 전송
- 얕은 비교(Shallow Comparison)
- Router
- Outlet
- Link / NavLink
- react-router-dom

---

## 1. State

### State란?

- 컴포넌트의 **동적인 데이터를 관리하기 위한 객체**이다.
- Props는 읽기 전용 데이터이지만, State는 컴포넌트 내부에서 변경할 수 있는 데이터이다.
- State는 해당 컴포넌트에서 관리한다.
- 컴포넌트의 State가 변경되면 React가 해당 컴포넌트를 다시 렌더링하여 변경된 UI를 반영한다.

### 형식

```jsx
const [상태변수, 변경함수] = useState(초기값);
```

- 컴포넌트에서 `useState` Hook을 호출하여 상태를 생성한다.
- 상태 변수의 값은 변경 함수를 통해 변경한다.
- 상태가 변경되면 컴포넌트가 다시 렌더링되고, 변경된 내용을 UI에서 확인할 수 있다.

### 예제

```jsx
const [myState, setMyState] = useState(0);
```

- `myState` : 현재 상태 데이터를 저장하는 변수
- `setMyState` : 상태를 변경할 때 사용하는 함수
- `useState(0)` : 상태의 초기값을 `0`으로 설정

### State 변경 흐름

```text
사용자 이벤트 발생
        ↓
setMyState() 실행
        ↓
State 변경
        ↓
컴포넌트 재렌더링
        ↓
변경된 State를 UI에 반영
```

---

## 2. 스타일 및 이미지

### 스타일 적용 방법

React에서는 여러 가지 방법으로 스타일을 적용할 수 있다.

#### ① 인라인 방식

`style` 속성을 사용하고 JavaScript 객체 형태로 스타일을 정의한다.

```jsx
const myStyle = {
  color: 'white',
  backgroundColor: 'DodgerBlue',
  padding: '10px'
};

<div style={myStyle}>내용</div>
```

#### ② CSS 파일 사용

기존 웹 개발처럼 CSS 파일을 작성하고 컴포넌트에서 import하여 적용할 수 있다.

#### ③ 스타일 라이브러리 사용

외부 CSS 또는 React용 스타일 라이브러리를 이용하여 스타일을 관리할 수 있다.

### 이미지 적용 방법

#### ① public 폴더의 이미지 사용

```jsx
<img src="/img/example.png" />
```

#### ② assets 폴더의 이미지 import

```jsx
import logo from './assets/logo.png';

<img src={logo} />
```

#### ③ 웹 URL 이용

```jsx
<img src="https://example.com/image.png" />
```

---

## 3. 폼값 전송

### HTML Form 기본 형식

```html
<form name="폼의이름" method="전송방식" action="전송할경로">
  <input type="submit" value="제출하기">
</form>
```

- `submit` 버튼을 누르면 `action`에 지정한 경로로 폼값을 전송한다.
- 기본 HTML Form 전송은 페이지 이동을 발생시킨다.
- React에서는 이벤트 객체를 이용하여 폼값을 처리할 수 있다.
- React에서 폼을 직접 처리할 때는 `preventDefault()`로 기본 동작을 차단하는 것부터 시작할 수 있다.

### React에서의 폼 처리

```jsx
<form onSubmit={(e) => {
  e.preventDefault();
  const title = e.target.title.value;
  console.log(title);
}}>
  <input type="text" name="title" />
  <input type="submit" value="제출" />
</form>
```

`e`는 React의 이벤트 객체이며, `e.target`을 통해 이벤트가 발생한 Form 요소에 접근할 수 있다.

---

## 4. 얕은 비교(Shallow Comparison)

### 얕은 비교란?

객체의 속성과 값을 하나씩 비교하는 것이 아니라 **객체가 가리키는 참조값(주소)**을 비교하는 방식이다.

- 같은 객체를 참조하면 `true`
- 서로 다른 객체를 참조하면 내용이 같아도 `false`

### 깊은 비교와 차이

**얕은 비교**

```text
객체의 참조값(메모리 주소)을 비교
```

**깊은 비교**

```text
객체의 모든 속성과 값을 재귀적으로 비교
```

### React에서 중요한 이유

React의 State가 객체나 배열과 같은 참조형 데이터인 경우, 기존 객체를 직접 수정하고 **같은 참조값을 다시 전달하면 상태 변경을 제대로 감지하지 못할 수 있다.**

예를 들어:

```jsx
MyData.front.push('React');
setMyData(MyData);
```

위 코드는 기존 `MyData` 객체를 직접 수정하고 같은 객체를 다시 전달한다.

반대로 새로운 객체와 배열을 만들어 전달하면 참조값이 달라진다.

```jsx
const newBack = [...MyData.back, 'Node.js'];
const newMyData = { ...MyData, back: newBack };
setMyData(newMyData);
```

### 얕은 비교를 사용하는 이유

1. 객체 전체를 비교하는 깊은 비교보다 빠르다.
2. 참조값만 확인하므로 비교 비용이 적다.
3. React는 불필요한 깊은 비교를 줄이고 효율적으로 변경 여부를 판단할 수 있다.

> State를 변경할 때는 기존 객체나 배열을 직접 수정하기보다 새로운 객체나 배열을 만들어 새로운 참조값을 전달하는 것이 중요하다.

---

## 5. Router

### Router를 사용하지 않는 화면 전환

간단한 애플리케이션에서는 상태 변수를 만들고 `if` 조건문을 사용하여 어떤 컴포넌트를 렌더링할지 결정할 수 있다.

하지만 화면이 많아질수록 다음과 같은 문제가 생긴다.

- 모든 화면 전환 로직을 `App.jsx`에서 처리해야 한다.
- 조건문이 복잡해진다.
- `App.jsx`의 코드가 커진다.
- 화면 전환 시 URL이 변경되지 않아 브라우저의 뒤로가기나 즐겨찾기 같은 URL 기반 기능을 활용하기 어렵다.

### Router란?

Router는 **URL 경로에 따라 어떤 컴포넌트를 화면에 표시할지 결정하는 도구**이다.

예:

```text
/home  → Home 컴포넌트
/about → About 컴포넌트
```

React Router를 사용하면 URL과 컴포넌트를 연결하여 페이지를 구성할 수 있다.

### 라우팅 흐름

```text
사용자가 URL 또는 링크 요청
        ↓
React Router가 URL 확인
        ↓
해당 Route 선택
        ↓
연결된 컴포넌트 렌더링
        ↓
UI에 표시
```

### Router 도입 이후

각 요청 URL에 따라 연결된 컴포넌트를 렌더링한다.

```text
/list  → ArticleList 컴포넌트
/write → ArticleWrite 컴포넌트
/view  → ArticleView 컴포넌트
```

### Router 도입의 장점

- **코드 분리** : 페이지별 컴포넌트를 분리하여 구조를 단순하게 만들 수 있다.
- **URL 관리** : 브라우저 URL을 통해 특정 화면에 직접 접근할 수 있다.
- **이력 관리** : 브라우저의 뒤로가기, 앞으로가기, 즐겨찾기 등을 활용할 수 있다.

### React Router 설치

```bash
npm i react-router-dom
```

---

## 6. Outlet

`Outlet`은 **중첩 라우팅에서 자식 Route의 컴포넌트를 렌더링할 위치를 지정하는 컴포넌트**이다.

예를 들어 공통 Layout 안에 여러 자식 페이지를 표시할 수 있다.

```jsx
function Layout() {
  return (
    <>
      <header>공통 메뉴</header>
      <Outlet />
    </>
  );
}
```

자식 Route가 `/list`라면 `Outlet` 위치에 목록 컴포넌트가 렌더링되는 방식이다.

---

## 7. Link와 NavLink

### Link

```jsx
<Link to="/about">소개</Link>
```

- React Router에서 페이지 이동을 위해 사용하는 컴포넌트이다.
- `to`에 지정한 경로로 이동한다.
- 현재 경로인지 확인하여 `active` 클래스를 자동으로 추가하지 않는다.

### NavLink

```jsx
<NavLink to="/about">소개</NavLink>
```

- `Link`와 마찬가지로 지정한 경로로 이동한다.
- 현재 URL과 `to`의 경로가 일치하는지 확인하여 **활성 상태(`active`)를 쉽게 처리할 수 있다.**
- 네비게이션 메뉴처럼 현재 선택된 메뉴를 표시해야 할 때 유용하다.

예:

```jsx
<NavLink
  to="/about"
  className={({ isActive }) => isActive ? 'active' : ''}
>
  소개
</NavLink>
```

현재 `/about` 경로라면 `active` 클래스를 적용하여 CSS로 선택된 메뉴를 표시할 수 있다.

### 핵심 차이

```text
Link
→ 단순한 페이지 이동

NavLink
→ 페이지 이동 + 현재 경로에 따른 활성 상태 처리
```

따라서 일반적인 페이지 이동에는 `Link`, 현재 선택된 메뉴를 표시해야 하는 네비게이션에는 `NavLink`를 사용할 수 있다.

---

## 📌 오늘 학습 정리

오늘은 React에서 **State를 이용한 동적 데이터 관리**, **스타일과 이미지 적용**, **Form 이벤트 처리**, **참조값을 기준으로 하는 얕은 비교**, 그리고 **React Router를 이용한 URL 기반 화면 전환**을 학습했다.

특히 State에서 객체와 배열을 직접 수정하면 기존 참조값이 유지될 수 있으므로, 전개 연산자(`...`) 등을 이용해 새로운 객체나 배열을 생성하여 State를 변경하는 것이 중요하다는 점을 확인했다.

Router에서는 `Link`와 `NavLink`의 차이를 학습했으며, `NavLink`는 현재 경로에 따른 활성 메뉴 표시가 필요한 네비게이션에 적합하다는 것을 정리했다.
