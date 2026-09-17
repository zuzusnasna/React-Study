import {Routes, Route} from 'react-router-dom';

import TopNavi from './Components/TopNavi';
import NotFound from './Components/NotFound';
import Home from './Components/Home';
import CommonLayout from './Components/CommonLayout';   
import LayoutIndex from './Components/LayoutIndex';
import RouterHooks from './Components/RouterHooks';

function App() {
  return (
    <>
    <TopNavi></TopNavi>
    <Routes>
      <Route path = "/" element = {<Home />} />
      <Route path = "/intro" element = {<CommonLayout />}>
        <Route index element = {<LayoutIndex />} />
        <Route path = "router" element = {<RouterHooks />} />
      </Route>
      <Route path = "*" element = {<NotFound />} />
    </Routes>
    </>
  )
}

export default App
