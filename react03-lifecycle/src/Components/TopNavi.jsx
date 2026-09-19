import {NavLink} from 'react-router-dom';

const TopNavi = () => {
  return(
    <nav>
      <NavLink to = "/">수명 주기</NavLink>&nbsp;&nbsp;
      <NavLink to = "/local">내부 통신</NavLink>&nbsp;&nbsp;
      <NavLink to = "/external">외부 통신</NavLink>&nbsp;&nbsp;
    </nav>
  )
}
export default TopNavi