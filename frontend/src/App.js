import './App.css';
import React from 'react';
import MyNavbar from './components/Navbar';
import Home from './pages/Home'
import Setting from './pages/Setting'
// import About from './pages/About'
import {Routes, Route } from "react-router-dom";
import Enrollment from './pages/Enrollment';
import Authentication from './pages/Authentication';
import "./index.css"

function App() {
  return (
    <>
      <MyNavbar/>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/enrollment" element={<Enrollment />}/>
            <Route path="/authentication" element={<Authentication />}/>
            <Route path="/setting" element={<Setting />}/>
            {/* <Route path="/about" element={<About />}/> */}
        </Routes>
    </>  
  );
}
export default App;
