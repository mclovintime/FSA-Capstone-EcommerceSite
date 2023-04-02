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
        <Link to="/" id="logo">
          DimTECH
        </Link>
        <Link className="productsNav" to="/Products">
          Products
        </Link>

        <div className="rightNav">
          <LoggedIn user={user} className="loggedin" />
          <div className="navbuttons">
            <Link to="/Login">
              <i className="fa-solid fa-user loginIcon"></i>
            </Link>
            <Link to="/mycart/cart_items"></Link>

            {user ? (
              <Link to="/mycart/cart_items">
                <i className="fa-solid fa-cart-shopping shoppingIcon"></i>
              </Link>
            ) : (
              <Link to="/guestcart">
                <i
                  id="cartIcon"
                  className="fa-solid fa-cart-shopping shoppingIcon"
                ></i>
              </Link>
            )}

            {user && user.username ? (
              <Link to="/MyProfile">
                <i className="fa-solid fa-address-card profileIcon"></i>
              </Link>
            ) : null}

            {user && user.is_admin === true ? (
              <Link to="/Admin" className="adminBtn">
                Admin
              </Link>
            ) : null}

            {isLoggedIn ? (
              <Logout
                handleLogout={handleLogout}
                setUser={setUser}
                setIsLoggedIn={setIsLoggedIn}
                className="logoutBtn"
              />
            ) : null}
          </div>
        </div>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default Navbar;
