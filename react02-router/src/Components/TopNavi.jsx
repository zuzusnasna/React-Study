import {Link, NavLink} from 'react-router-dom';

const TopNavi = () => {
  return (
    <>
      <a href = "/">Home</a>&nbsp;&nbsp;
      <NavLink to = "/intro">인트로</NavLink>&nbsp;&nbsp;
      <NavLink to = "/intro/router">Router 관련 Hook</NavLink>&nbsp;&nbsp;
      <Link to = "/xyz">잘못된 링크</Link>&nbsp;&nbsp;
    </>
  )
}

export default TopNavi;