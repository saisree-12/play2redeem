// import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LandingPage from './Components/LandingPage';
import Signup from './Components/Signup'
import Login from './Components/Login'
import Games from './Components/Games'
import Casino from './Components/Casino';
import Riddle from './Components/Riddle';
import Profile from './Components/Profile';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/games' element={<Games />}></Route>
          <Route path='/games/casino' element={<Casino />}></Route>
          <Route path='/games/riddle' element={<Riddle />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
        </Routes> 
      </BrowserRouter>
    </>
  );
}

export default App;  
