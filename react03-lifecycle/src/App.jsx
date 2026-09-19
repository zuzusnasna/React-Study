import {Routes, Route} from 'react-router-dom';
import TopNavi from './Components/TopNavi';
import Lifecycle from './Components/Lifecycle';
import LocalJsonFetcher from './Components/LocalJsonFetcher';
import ExternalApiFetcher from './Components/ExternalApiFetcher';
import LocalJsonFetcher2 from './Components/LocalJsonFetcher2';
import ExternalApiFetcher2 from './Components/ExternalApiFetcher2';

function App() {
  return (
    <>
      <TopNavi></TopNavi>
      <Routes>
        <Route path="/" element={<Lifecycle />} />
        <Route path="/local" element={<LocalJsonFetcher />} />
        <Route path="/external" element={<ExternalApiFetcher />} />
        <Route path="/local2" element={<LocalJsonFetcher2 />} />
        <Route path="/external2" element={<ExternalApiFetcher2 />} />
      </Routes>
    </>
  );
}

export default App;
