import React, { createContext, useState } from "react";
import Nav from './Nav'
import { Routes, Route } from 'react-router-dom'
import Register from './Register'
import Login from "./Login";
import Myprofile from "./Myprofile";
import './App.css';

export const store = createContext();

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <div>
      <store.Provider value={[token, setToken]}>
        <Nav />
        <Routes >
          <Route path="/Mern-Stack-Project/" element={<Login />} />
<Route path="/Mern-Stack-Project/register" element={<Register />} />
<Route path="/Mern-Stack-Project/login" element={<Login />} />
<Route path="/Mern-Stack-Project/myprofile" element={<Myprofile />} />

        </Routes>
      </store.Provider>
    </div>
  );
};

export default App;
