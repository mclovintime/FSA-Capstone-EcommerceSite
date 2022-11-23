import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api-adapter";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const { token, user } = await loginUser(username, password);
    localStorage.removeItem("token");
    localStorage.setItem("token", token);
    localStorage.removeItem("username");
    localStorage.setItem("username", username);
    setUsername("");
    setPassword("");
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
    <form onSubmit={handleLogin}>
      <h3>Username:</h3>
      <input
        type="text"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <h3>Password:</h3>
      <input
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" type="submit">Login</button>
      </form>
      <br />
      <h3>Not Yet a User?</h3>
      <Link to="/register" className="link">
        Register
      </Link>
    </div>
  );
};

export default LoginPage;
