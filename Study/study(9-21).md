# React 학습 정리 — 2026-09-21

## 📌 학습 키워드

- React 렌더링과 리렌더링
- 성능 최적화
- useRef
- useMemo
- useCallback
- useId
- 메모이제이션
- 함수 참조값과 의존성 배열
- DOM 요소 참조

---

# 1. 리액트의 작동 방식

React는 State나 Props가 변경되면 컴포넌트를 다시 렌더링하여 변경된 UI를 반영한다.

~~~text
State / Props 변경
        ↓
컴포넌트 리렌더링
        ↓
변경된 UI 반영
~~~

컴포넌트가 커지거나 상태 변화가 복잡해지면 불필요한 렌더링이나 계산이 반복될 수 있다.
따라서 필요한 경우 계산이나 함수 생성을 최적화하여 애플리케이션의 성능을 높일 수 있다.

---

# 2. 성능 최적화 Hook

| Hook | 주요 역할 |
|---|---|
| useRef | 렌더링 없이 값이나 DOM 요소를 참조하거나 저장 |
| useMemo | 연산 비용이 큰 값을 메모이제이션하여 재계산 방지 |
| useCallback | 함수를 메모이제이션하여 함수 재생성 및 참조 변경 방지 |
| useId | 일관된 고유 ID 생성 |

핵심은 무엇을 메모이제이션하거나 참조하는지가 서로 다르다는 것이다.

~~~text
useRef
→ 값 / DOM 참조

useMemo
→ 계산 결과 기억

useCallback
→ 함수 참조 기억

useId
→ 고유 ID 생성
~~~

---

# 3. useRef

## 3-1. 값 저장

useRef는 렌더링을 발생시키지 않으면서 값을 저장할 수 있다.

~~~jsx
const refNum = useRef(0);

refNum.current = refNum.current + 1;
~~~

current 값이 변경되어도 그 자체로 컴포넌트가 다시 렌더링되지는 않는다.

## 3-2. useState와 비교

~~~text
useState
→ 값 변경
→ 컴포넌트 리렌더링

useRef
→ current 변경
→ 리렌더링 발생하지 않음
~~~

실습에서는 State, Ref, 일반 변수를 각각 증가시키며 차이를 확인했다.

~~~jsx
const [stateNum, setStateNum] = useState(0);
const refNum = useRef(0);
let myNum = 0;
~~~

- State는 변경되면 리렌더링된다.
- Ref는 current 값이 변경되어도 리렌더링되지 않는다.
- 일반 변수는 리렌더링이 발생하면 다시 초기화된다.

## 3-3. DOM 요소 참조

useRef는 input 같은 DOM 요소를 참조하는 데 사용할 수 있다.

~~~jsx
const passRef1 = useRef();
const passRef2 = useRef();

<input ref={passRef1} />
<input ref={passRef2} />

passRef1.current.value
~~~

비밀번호 확인 실습에서는 Ref를 이용해 두 input의 값을 직접 비교했다.

~~~jsx
if (passRef1.current.value === passRef2.current.value) {
  alert("비밀번호 확인이 완료되었습니다");
}
~~~

## 3-4. useEffect와 함께 사용

렌더링이 끝난 뒤 input에 포커스를 주는 데에도 사용할 수 있다.

~~~jsx
useEffect(() => {
  passRef1.current.focus();
}, []);
~~~

---

# 4. useMemo

## 4-1. useMemo란?

useMemo는 계산 결과를 메모이제이션하여 의존성 값이 변경되지 않으면 기존 결과를 재사용하는 Hook이다.

~~~jsx
const result = useMemo(() => calculate(), [value]);
~~~

실습에서는 계산 비용이 큰 소수 판단 함수를 예제로 사용했다.

~~~jsx
const checkPrime = useMemo(() => isPrime(number), [number]);
~~~

동작은 다음과 같다.

~~~text
number 변경
↓
isPrime() 다시 실행
↓
계산 결과 저장

text 변경
↓
number 변경 없음
↓
기존 결과 재사용
~~~

따라서 이름 입력으로 컴포넌트가 리렌더링되어도 number가 변하지 않았다면 소수 판단 연산을 다시 실행하지 않는다.

## 4-2. useMemo의 핵심

useMemo는 함수를 기억하는 것이 아니라 함수의 실행 결과인 값을 메모이제이션한다.

~~~text
useMemo
→ 값 기억
~~~

---

# 5. useCallback

## 5-1. useCallback이란?

useCallback은 함수를 메모이제이션하여 의존성 값이 변경되지 않는 동안 같은 함수 참조를 유지하는 Hook이다.

~~~jsx
const fn = useCallback(() => {
  calculate();
}, [value]);
~~~

## 5-2. 함수 참조값

컴포넌트 안에서 선언한 함수는 부모 컴포넌트가 리렌더링될 때 새로 생성될 수 있다.

~~~text
number 변경
↓
부모 컴포넌트 리렌더링
↓
fnBoxStyle 새로 생성
↓
함수 참조값 변경
~~~

자식 컴포넌트가 해당 함수를 useEffect의 의존성으로 사용하면 필요하지 않은 효과 실행이 발생할 수 있다.

## 5-3. useCallback 실습

~~~jsx
const fnBoxStyle = useCallback(() => {
  return {
    backgroundColor: colorArr[boxColor],
    width: boxSize + "px",
    height: boxSize + "px",
    textAlign: "center",
    lineHeight: boxSize + "px"
  };
}, [boxSize, boxColor]);
~~~

크기나 색상이 변경되면 새로운 함수가 생성되고, 숫자만 변경되면 같은 함수 참조를 유지한다.

## 5-4. 의존성 배열과 ESLint 경고

실습 중 다음과 같은 경고를 확인했다.

~~~text
React Hook useCallback has a missing dependency: colorArr
~~~

colorArr를 컴포넌트 내부에 선언하면 렌더링마다 새로운 배열 참조가 만들어질 수 있다.

~~~jsx
const colorArr = ["red", "green", "blue"];
~~~

고정된 배열이라면 컴포넌트 바깥으로 이동하여 불필요한 참조 변경을 줄일 수 있다.

~~~jsx
const colorArr = ["red", "green", "blue"];

const UseCallbackExam = () => {
  // 컴포넌트 코드
};
~~~

---

# 6. useId

useId는 React에서 사용할 수 있는 일관된 고유 ID를 생성하는 Hook이다.

~~~jsx
const id = useId();

<label htmlFor={id}>{label}</label>
<input type="text" id={id} />
~~~

특히 input과 label을 연결하거나 여러 컴포넌트에서 ID 충돌을 피할 때 유용하다.

## 6-1. 실습 예제

~~~jsx
const InputField = ({ label, name }) => {
  const id = useId();

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} name={name} />
    </>
  );
};
~~~

라디오 버튼은 하나의 ID를 기준으로 여러 ID를 만들 수도 있다.

~~~jsx
const commonId = useId();

<input id={commonId + "-gender1"} />
<label htmlFor={commonId + "-gender1"}>남자</label>

<input id={commonId + "-gender2"} />
<label htmlFor={commonId + "-gender2"}>여자</label>
~~~

---

# 7. 네 가지 Hook 비교

| Hook | 관리 또는 기억하는 것 | 주요 목적 |
|---|---|---|
| useRef | 값 / DOM 참조 | 렌더링 없이 값 저장 및 DOM 접근 |
| useMemo | 계산 결과 | 비싼 계산의 재실행 방지 |
| useCallback | 함수 참조 | 함수 재생성과 참조 변경 방지 |
| useId | 고유 ID | input과 label 연결 및 ID 충돌 방지 |

쉽게 기억하면 다음과 같다.

~~~text
useRef
→ 값 / DOM

useMemo
→ 계산 결과

useCallback
→ 함수

useId
→ ID
~~~

---

# 8. useMemo와 useCallback의 차이

두 Hook은 모두 메모이제이션을 사용하지만 기억하는 대상이 다르다.

~~~jsx
const result = useMemo(() => calculate(), [value]);
~~~

useMemo는 계산 결과를 기억한다.

~~~jsx
const fn = useCallback(() => {
  calculate();
}, [value]);
~~~

useCallback은 함수 자체의 참조를 기억한다.

~~~text
useMemo
→ 값 기억

useCallback
→ 함수 기억
~~~

---

# 9. 오늘 실습한 프로젝트

오늘은 react04-hook-optimization 프로젝트에서 각 Hook을 직접 실습했다.

~~~text
react04-hook-optimization/
└── src/
    ├── App.jsx
    └── components/
        ├── TopNavi.jsx
        ├── UseRefExam1.jsx
        ├── UseRefExam2.jsx
        ├── UseMemoExam.jsx
        ├── UseCallbackExam.jsx
        └── UseIdExam.jsx
~~~

React Router를 이용해 각각의 예제를 분리해서 확인했다.

~~~text
/use-ref1
/use-ref2
/use-memo
/use-callback
/use-id
~~~

---

## 📌 오늘 학습 정리

오늘은 React의 작동 방식과 불필요한 렌더링 및 계산을 줄이기 위한 Hook을 학습했다.

특히 useRef를 통해 렌더링 없이 값을 저장하거나 DOM 요소를 참조하고, useMemo를 통해 계산 비용이 큰 작업의 결과를 재사용하는 방법을 확인했다.

useCallback에서는 함수 자체의 참조값을 유지하여 자식 컴포넌트의 useEffect가 불필요하게 다시 실행되는 것을 줄이는 원리를 학습했다. 또한 의존성 배열과 ESLint 경고를 통해 Hook 내부에서 사용하는 값과 참조값의 관계도 확인했다.

마지막으로 useId를 사용해 input과 label을 연결할 고유 ID를 생성하는 방법을 실습했다.

결론적으로 오늘 배운 Hook은 각각의 목적이 다르다.

~~~text
useRef
→ 렌더링 없이 값 / DOM 참조

useMemo
→ 계산 결과 메모이제이션

useCallback
→ 함수 참조 메모이제이션

useId
→ 일관된 고유 ID 생성
~~~

성능 최적화 Hook은 무조건 사용하는 것이 아니라 실제로 반복되는 계산이나 함수 참조 변경이 성능에 영향을 주는 상황에서 적절하게 사용하는 것이 중요하다.