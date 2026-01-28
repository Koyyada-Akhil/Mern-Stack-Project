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
    api.axios.post("/login", data)
      .then(res => {
        console.log(res.data);  // check token
        setToken(res.data.token); // if backend returns accessToken use res.data.accessToken
        navigate("/myprofile");
        

      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <center>
       <form className="auth-form" onSubmit={SubmitHandler} autoComplete="off">
          <h3>Login</h3>
          <input type="email" name="email" placeholder="Email" value={data.email} onChange={changeHandler} /> <br />
          <input type="password" name="password" placeholder="password" value={data.password} onChange={changeHandler} /><br/>
          <input type="Submit" value="Login" />
        </form>
      </center>
    </div>
  );
}

export default Login;
