import {Outlet} from 'react-router-dom';

const CommonLayout = () => {
  return (
    <>
      <header style={{backgroundColor: 'lightgray', padding: '10px'}}>
        <h1>Outlet 컴포넌트 알아보기</h1>
      </header>
      <article>
        <Outlet />
      </article>
      <footer style={{backgroundColor: 'lightgray', padding: '10px'}} >
        공통 레이아웃
      </footer>
    </>
  )
}

export default CommonLayout;