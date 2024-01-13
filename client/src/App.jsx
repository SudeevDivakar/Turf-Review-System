import { Routes, Route } from 'react-router-dom';
import AllTurfs from './pages/AllTurfs';
import Turf from './pages/Turf';
import NewTurf from './pages/NewTurf';
import EditTurf from './pages/EditTurf';
import NotFound from './pages/NotFound';
import NewUser from './pages/NewUser';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/turfs' element={<AllTurfs />} />
        <Route path='/turfs/:id' element={<Turf />} />
        <Route path='/turfs/new' element={<NewTurf />} />
        <Route path='/turfs/edit/:id' element={<EditTurf />} />
        <Route path='/register' element={<NewUser />} />
        <Route path='/login' element={<Login />} />
        <Route path='/notFound' element={<NotFound />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
