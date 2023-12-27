import { Routes, Route } from 'react-router-dom';
import AllTurfs from './pages/AllTurfs';
import Turf from './pages/Turf';
import NewTurf from './pages/NewTurf';
import EditTurf from './pages/EditTurf';

function App() {
  return (
    <>
      <Routes>
        <Route path='/turfs' element={<AllTurfs />} />
        <Route path='/turfs/:id' element={<Turf />} />
        <Route path='/turfs/new' element={<NewTurf />} />
        <Route path='/turfs/edit/:id' element={<EditTurf />} />
      </Routes>
    </>
  )
}

export default App
