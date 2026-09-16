
function FronComp() { //일반함수로 작성된 컴포넌트
  return (<>
    <li>프론트엔드</li>
    <ul>
      <li>HTML5</li>
      <li>CSS3</li>
      <li>Javascript</li>
      <li>jQuery</li>
    </ul>
  </>)
}

const BackComp = () => { //화샇표 함수로 작성된 컴포넌트
  return (<>
    <li>백엔드</li>
    <ul>
      <li>Java</li>
      <li>Oracle</li>
      <li>JSP</li>
      <li>Spring Boot</li>
    </ul>
  </>)
}

let FormComp = function(){ //익명함수로 작성된 컴포넌트
  return (<>
  <form>
    <select name="gubun">
      <option value="front">프론트엔드</option>
      <option value="back">백엔드</option>
    </select>
    <input type="text" name="title" />
    <input type="submit" value="추가" />
  </form>
  </>)
}

function App() {

  return (<>
    <h2>React 기본형</h2>
    <ol>
      <FronComp>  </FronComp>
      <BackComp /><BackComp />
    </ol>
    <FormComp />
  </> 
  )
}


export default App
