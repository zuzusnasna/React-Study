import {Routes, Route} from 'react-router-dom';
import TopNavi from './Components/TopNavi';
import Lifecycle from './Components/Lifecycle';
import LocalJsonFetcher from './Components/LocalJsonFetcher';
import ExternalApiFetcher from './Components/ExternalApiFetcher';
function App() {


  return (
    <>
    <TopNavi></TopNavi>
    <Routes>
      <Route path = "/" element = {<Lifecycle />} />
      <Route path = "/local" element = {<LocalJsonFetcher />} />
      <Route path = "/external" element = {<ExternalApiFetcher />} />
    </Routes>
    </>
  )
}

export default App
