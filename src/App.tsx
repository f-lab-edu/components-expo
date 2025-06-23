import './global.css';
import Home from './components/Home';
import LodgingTest from '@/components/lodging/LodgingTest';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<LodgingTest />} />
    </Routes>
  );
}

export default App;
