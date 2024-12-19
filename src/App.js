import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Donors from './Pages/Donors';
import Donorspage from './Pages/Finddonors';
import CurrentUserProfile from './Pages/Profile';
import DonorProfile from './Pages/Componets/profile';
import Contact from './Pages/Contect';

function App() {
  return (
    <BrowserRouter>
     <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Donors" element={<Donors />} />
        <Route path="/Donorspage" element={<Donorspage />} />
        <Route path="/Profile" element={<CurrentUserProfile />} />
        <Route path="/DonorProfile" element={<DonorProfile />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />

      </Routes>
  </BrowserRouter>

     
  );
}

export default App;
