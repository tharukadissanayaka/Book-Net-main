import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Kids from './Kids';
import Fantasy from './Fantasy';
import SciFi from './SciFi';
import Romantic from './Romantic';
import Historical from './Historical';
import Thriller from './Thriller';
import MyCollection from './MyCollection'; // Import MyCollection component

import ContinueReading from './ContinueReading'; // Import ContinueReading component
import Admin from './Admin';
import NewBooks from "./NewBooks";


function App() {
  
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />

        {/* Category Pages */}
        <Route path="/kids" element={<Kids />} />
        <Route path="/fantasy" element={<Fantasy />} />
        <Route path="/scifi" element={<SciFi />} />
        <Route path="/romantic" element={<Romantic />} />
        <Route path="/historical" element={<Historical />} />
        <Route path="/thriller" element={<Thriller />} />
        <Route path="/mycollection" element={<MyCollection />} /> {/* Route for MyCollection */}
        <Route path='/admin' element={<Admin />} />
        <Route path='/newbooks' element={<NewBooks />} />
        <Route path="/continue-reading" element={<ContinueReading />} />
        <Route path="/continue-reading/:id" element={<ContinueReading />} />

        </Routes>
    </BrowserRouter>
  );
}

export default App;

