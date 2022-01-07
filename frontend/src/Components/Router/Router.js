import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../../Routes/Home';
import Single from '../../Routes/Single';
import Multiplayer from '../../Routes/Multiplayer';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path='/single' element={<Single />} />
          <Route path='/multiplayer' element={<Multiplayer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;
