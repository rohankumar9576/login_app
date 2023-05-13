import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import Signup from './components/SignUp';
import Header from './components/Header';


function App() {
  return (
    <>
    <Router>
    <Header/>
      <Routes>
        <Route path ='/' element={<HomePage/>}></Route>
        <Route path ='/login' element={<Login/>}></Route>
        <Route path ='/signup' element={<Signup/>}></Route>
      
      </Routes>
    </Router>
    </>
  );
}

export default App;