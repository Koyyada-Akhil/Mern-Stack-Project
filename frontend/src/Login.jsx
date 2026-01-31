import React from "react";
import { useState, useContext } from "react";
import { store } from "./App";
import { useNavigate } from "react-router-dom";
import api from "./api/axios";

const Login = () => {
  const [token, setToken] = useContext(store);
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const SubmitHandler = e => {
    e.preventDefault();
    api.post("/login", data)
      .then(res => {
        console.log(res.data);
        setToken(res.data.token);
        navigate("/myprofile");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="center-box">
      <form className="auth-form" onSubmit={SubmitHandler} autoComplete="off">
        <h3>Login</h3>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={data.email} 
          onChange={changeHandler} 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="password" 
          value={data.password} 
          onChange={changeHandler} 
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;