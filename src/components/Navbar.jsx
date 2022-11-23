import React from "react";
import { Outlet, Link } from "react-router-dom";
import { LoggedIn, Logout } from "./";

const Navbar = (props) => {
  const user = props.user;
  const setUser = props.setUser
  const handleLogout = props.handleLogout
  const isLoggedIn = props.isLoggedIn
  const setIsLoggedIn = props.setIsLoggedIn
  console.log(user);
  return (
    <div>
      <div>
        <h2>DimTech</h2>
        <LoggedIn user={user}/>
      {isLoggedIn ? <Logout handleLogout={handleLogout} setUser={setUser} setIsLoggedIn={setIsLoggedIn}/> : null}
      
      </div>
      <div id="navbar">
        <Link to="/Products">Home</Link>
        <Link to="/Login">Login</Link>
        <Link to="/Register">Register</Link>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default Navbar;
