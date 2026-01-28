import React from "react";
import { useState } from "react";
import axios from "axios";

const Register = () => {
    const [data,setData]=useState({
        username:"",
        email:"",
        password:"",
        confirmpassword:""
    })
    
    const changeHandler= e=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const SubmitHandler=e=>{
        e.preventDefault()
         axios.post("/register", data)
    .then(res => {
      alert(res.data)
      setData({
        username: "",
        email: "",
        password: "",
        confirmpassword: ""
      })
    })
    .catch(err => console.log(err))
}
  return (
    <div className="center-box">
       
           <form className="auth-form" onSubmit={SubmitHandler}  autoComplete='off'>

                <h3>Register</h3>
                <input type="text"  name="username" placeholder='User name' value={data.username} onChange={changeHandler} /> <br/>
                <input type="email" name="email" placeholder='Email'  value={data.email} onChange={changeHandler}  /><br/>
                <input type="password"  name="password" placeholder='password' value={data.password} onChange={changeHandler} /><br/>
                <input type="password"  name="confirmpassword" placeholder='confirmpassword' value={data.confirmpassword} onChange={changeHandler} /><br/>
                <input type="Submit" value="Register" />
            </form>
      

      
    </div>
  )
}

export default Register
