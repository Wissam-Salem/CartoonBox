import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';

import PageNotFound from './pages/PageNotFound/PageNotFound';
import Upgrade from './pages/Upgrade/Upgrade';
import CartoonPage from './pages/CartoonPage/CartoonPage';

import Movies from './pages/Movies/Movies';
import Tv from './pages/Tv/Tv';

import Action from './pages/Sections/Action/Action';
import Horror from './pages/Sections/Horror/Horror';
import Adventure from './pages/Sections/Adventure/Adventure';
import SciFi from './pages/Sections/SciFi/SciFi';
import Comedia from './pages/Sections/Comedia/Comedia';
import SearchPage from './pages/SearchPage/SearchPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/search/:cartoonName' element={<SearchPage />} />
        <Route path='/upgrade_account' element={<Upgrade />} />
        <Route path='/cartoons/:cartoonID/:cartoonName' element={<CartoonPage />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/tv' element={<Tv />} />
        <Route path='/genre/action' element={<Action />} />
        <Route path='/genre/horror' element={<Horror />} />
        <Route path='/genre/adventure' element={<Adventure />} />
        <Route path='/genre/sci-fi' element={<SciFi />} />
        <Route path='/genre/comedia' element={<Comedia />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
