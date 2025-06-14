import './global.css';
import Home from './components/Home';
import { SearchBarProvider } from '@/components/searchbar/contexts/SearchBarContext';

function App() {
  return (
    <>
      <SearchBarProvider>
        <Home />
      </SearchBarProvider>
    </>
  );
}

export default App;
