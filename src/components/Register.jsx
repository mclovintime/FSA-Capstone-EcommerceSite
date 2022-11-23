import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api-adapter";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [registerMessage, setRegisterMessage] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    const { token } = await registerUser(username, password, setRegisterMessage);
    localStorage.removeItem("token");
    localStorage.setItem("token", token);
    setUsername("");
    setPassword("");

    if (token) {
      toast.success("Register Successful");
      navigate("/Home");
    } else {
      toast.error("Register Failed");
      navigate("/Register");
    }
  }
  return (
    <div className="register-container">
      <h2 className="register-header">Register</h2>
      <form onSubmit={handleRegister}>
        <input
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
      <small>*password must be 8 characters or more</small>
      {/*can you toastify to create an error message of short password */}
      <br />
      <h3>Already a User?</h3>
      <Link to="/login" className="link">
        Login
      </Link>
      <div id="registerMessage">{registerMessage}</div>
     
    </div>
  );
};
export default Register;
