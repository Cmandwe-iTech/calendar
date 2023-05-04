import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./signin.css";
const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({name:"", email: "", password: "" });
  const [confirmpass, setConfirmPass] = useState("");
  const SignupHandler = () => {
    if (validate(user)) {
      axios
        .post("http://localhost:8000/register", user)
        .then((res) => {
          if (res.status === 200) {
            alert("registerd successfully");
            navigate("/");
          }
        });
    }
  };
  let validate = (user) => {
    if (!user.email) {
      alert("email is required");
      return 0;
    } else if (!user.password) {
      alert("password is required");
      return 0;
    } else if (user.password.length < 5) {
      alert("password must be more than 4 characters");
      return 0;
    } else if (user.password.length > 10) {
      alert("password must be less than 10 characters");
      return 0;
    } else if (!confirmpass) {
      alert("confirmpassword is required");
      return 0;
    } else if (user.password !== confirmpass) {
      alert("passwords are not matching");
      return 0;
    }
    return 1;
  };
  return (
    <div className="login-container">
      <h1>register</h1>
      <div className="div">
        <input
          type="text"
          placeholder="enter name here...."
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </div>
      <div className="div">
        <input
          type="email"
          placeholder="enter email here...."
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div className="div">
        <input
          type="password"
          placeholder="enter password here...."
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>
      <div className="div">
        <input
          type="password"
          placeholder="enter confirmpassword here...."
          onChange={(e) => setConfirmPass(e.target.value)}
        />
      </div>
      <div>
        <button onClick={SignupHandler}>SignUp</button>
      </div>
      <Link to="/">
        <button>Member LogIn</button>
      </Link>
    </div>
  );
};

export default Signup;
