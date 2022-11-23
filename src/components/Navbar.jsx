import React from "react";
import { Outlet, Link } from "react-router-dom";
import { LoggedIn } from "./";

const Navbar = (props) => {
  const user = props.user;
  console.log(user);
  return (
    <div>
      <div>
        <h2>DimTech</h2>
      </div>
      <div id="navbar">
        <Link to="/Home">Home</Link>
        <Link to="/Login">Login</Link>
        <Link to="/Register">Register</Link>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default Navbar;
