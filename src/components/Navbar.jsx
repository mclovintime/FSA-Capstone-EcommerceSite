import React from "react";
import { Outlet, Link } from "react-router-dom";
import { LoggedIn, Logout } from "./";
import "./Navbar.css";

const Navbar = (props) => {
  const user = props.user;

  const setUser = props.setUser;
  const handleLogout = props.handleLogout;
  const isLoggedIn = props.isLoggedIn;
  const setIsLoggedIn = props.setIsLoggedIn;
  return (
    <div>
      
      <div id="navbar">
        {/* <div className="leftNav"> */}
        <Link to="/" id="logo">
          DimTech
        </Link>
        <LoggedIn user={user} />
        {/* </div> */}
      <div className="mainNav">
        <Link id="productsThing" to="/Products">
          Products
        </Link>
        <Link to="/Login">
          <i className="fa-solid fa-user loginIcon"></i>
        </Link>
        {/* <Link to="/Register">Register</Link> */}
        <Link to="/mycart/cart_items"></Link>

        {user ? (
          <Link to="/mycart/cart_items">
            <i className="fa-solid fa-cart-shopping shoppingIcon"></i>
          </Link>
        ) : (
          <Link to="/guestcart">
            <i id="cartIcon" className="fa-solid fa-cart-shopping shoppingIcon"></i>
          </Link>
        )}

        {user ? (
          <Link to="/MyProfile">
            <i className="fa-solid fa-address-card profileIcon"></i>
          </Link>
        ) : (
          <Link to="/Home">
            <i className="fa-solid fa-address-card profileIcon"></i>
          </Link>
        )}
        

        {user && user.is_admin === true ? <Link to="/Admin" className="adminIcon">Admin</Link> : null}
          {/* <div className="rightNav"> */}
        
        {isLoggedIn ? (
          <Logout
            handleLogout={handleLogout}
            setUser={setUser}
            setIsLoggedIn={setIsLoggedIn}
          />
         
        ) : null}
        {/* </div>  */}
        </div>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default Navbar;
