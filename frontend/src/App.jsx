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
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/myprofile" element={<Myprofile />} />
        </Routes>
      </store.Provider>
    </div>
  );
};

export default App;
