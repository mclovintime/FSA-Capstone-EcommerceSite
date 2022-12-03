import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api-adapter";
import { toast } from "react-toastify";
import "./LoginPage.css";
import Footer from "./Footer";



const LoginPage = ({ setUser, setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loginMessage, setLoginMessage] = useState("");


  async function handleLogin(e) {
    e.preventDefault();
    const { token, user } = await loginUser(username, password, setLoginMessage);
    localStorage.removeItem("token");
    localStorage.setItem("token", token);
    localStorage.removeItem("username");
    localStorage.setItem("username", username);
    setUsername("");
    setPassword("");
    setUser(user);
    setIsLoggedIn(true);
  

  if (token) {
    toast.success("Login Successful");
    navigate("/Products");
  } else {
    toast.error("Login Failed");
    navigate("/Login");

  }
}

  return (
    <div className="login-container">
      <h1 className="login-header">Login</h1>
    <form onSubmit={handleLogin} className="login-form">
      <h3>Username:</h3>
      <input
        id="usernameLogin"
        type="text"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <h3>Password:</h3>
      <input id="passwordIP"
        
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="loginButton" type="submit">Login</button>
      </form>
      
      <div className="register-link-container">
      <h3 id="notYet">Not Yet a User? </h3>
      <Link to="/register" className="link">
        Register
      </Link>
      <div id="loginMessage">{loginMessage}</div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default LoginPage;