import React from "react";
import { useContext, useEffect, useState } from "react";
import { store } from "./App";
import { useNavigate } from "react-router-dom";
import api from "./api/axios";


const Myprofile = () => {
  const [token, setToken] = useContext(store);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios.get(`${import.meta.env.VITE_API_URL}/myprofile`, {
      headers: { "x-token": token },
    })
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  }, [token, navigate]);

  return (
    
    <div className="profile-box">
      {data && (
        <div className="user">
             <h2>Welcome, {data.username}</h2>
             <button onClick={() => setToken(null)}>Logout</button>
        </div>

      )}
    </div>
  );
};

export default Myprofile;
