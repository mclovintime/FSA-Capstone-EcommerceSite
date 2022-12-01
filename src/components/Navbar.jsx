import React from "react";
import { Outlet, Link } from "react-router-dom";
import { LoggedIn, Logout } from "./";
import "./Navbar.css";


const Navbar = (props) => {
  const user = props.user;
  console.log(user)
  const setUser = props.setUser
  const handleLogout = props.handleLogout
  const isLoggedIn = props.isLoggedIn
  const setIsLoggedIn = props.setIsLoggedIn
  return (
    <div>
      <div>
        
      
      {isLoggedIn ? <Logout handleLogout={handleLogout} setUser={setUser} setIsLoggedIn={setIsLoggedIn}/> : null}
      
      </div>
      <div id="navbar">
      <h2 id="logo">DimTech</h2>
      <LoggedIn user={user}/>
        <Link id="homeThing" to="/Products">Home</Link>
        <Link id="productsThing" to="/Products">Products</Link>
        <Link to="/Login"><i className="fa-solid fa-user"></i></Link>
        {/* <Link to="/Register">Register</Link> */}
        <Link to="/mycart/cart_items"></Link>
        
        {user ? <Link to="/mycart/cart_items"><i className="fa-solid fa-cart-shopping"></i></Link>  :
        <Link to="/guestcart"><i id="cartIcon" className="fa-solid fa-cart-shopping"></i></Link>
        }

        {user && user.is_admin === true ? (
          <Link to="/Admin">Admin</Link>
        ): null}
        
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default Navbar;
