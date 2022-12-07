import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api-adapter";
import { toast } from "react-toastify";
import "./register.css";


const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [registerMessage, setRegisterMessage] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    const { token } = await registerUser(
      email,
      username,
      password,
      setRegisterMessage
    );
    localStorage.removeItem("token");
    localStorage.setItem("token", token);
    setUsername("");
    setPassword("");

    if (token) {
      toast.success("Register Successful");
      navigate("/Login");
    } else {
      toast.error("Register Failed");
      navigate("/Register");
    }

    if (password.length < 8) {
      toast.error("Password must be 8 characters or more")
    }
  }

    
  return (
    <div className="register-container">
      <h2 className="register-header">Register</h2>
      <form onSubmit={handleRegister} className="register-form">
        <input
          className="registerEmail"
          type="text"
          name="email"
          placeholder="email *"
          required
          value={email}
          onChange={function (e) {
            setEmail(e.target.value);
          }}
        />
        <input
          className="registerUsername"

          type="text"
          name="username"
          placeholder="username *"
          required
          value={username}
          onChange={function (e) {
            setUsername(e.target.value);
          }}
        />
        <input
          className="registerPassword"
          type="password"
          name="password"
          placeholder="password *"
          required
          value={password}
          onChange={function (e) {
            setPassword(e.target.value);
          }}
        />
        <button className="register-button" type="submit">
          Register
        </button>
      </form>
      <div className="login-link-container">

      <h3 className="login-link">Already a User?</h3>
      <Link to="/login" className="link">
        Login
      </Link>
    </div>
    </div>
  );
};
export default Register;
