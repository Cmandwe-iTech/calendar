import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./signin.css"
const Sign = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const Submithandler=()=>{
    axios.post("http://localhost:8000/login",user).then((res)=>{
      if(res.status === 200){
        alert("login successfully");
        window.localStorage.setItem("token",res.data.token);
        navigate('/calendar')
      }
    }).catch((e)=>{
      alert("email and password not matching")
    })
  }
  return (
    <div className="login-container">
        <h1>Member LogIn</h1>
      <div className="div">
        <input type="email" placeholder="enter email here..." onChange={(e)=>setUser({...user,email:e.target.value})} />
      </div>
      <div className="div">
        <input type="password" placeholder="enter password here..." onChange={(e)=>setUser({...user,passowrd:e.target.value})}/>
      </div>
      <div><button onClick={Submithandler}>LogIn</button></div>
      <Link to="/signup"><button>SignUp</button></Link> 
    </div>
  );
};

export default Sign;