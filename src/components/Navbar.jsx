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
        

      
      </div>
      <div id="navbar">
      <Link to="/" id="logo">DimTech</Link>
      <LoggedIn user={user}/>
       
        <Link id="productsThing" to="/Products">Products</Link>
        <Link to="/Login"><i className="fa-solid fa-user"></i></Link>
        {/* <Link to="/Register">Register</Link> */}
        <Link to="/mycart/cart_items"></Link>
        
        {user ? <Link to="/mycart/cart_items"><i className="fa-solid fa-cart-shopping"></i></Link>  :
        <Link to="/guestcart"><i id="cartIcon" className="fa-solid fa-cart-shopping"></i></Link>
        }

        {user ? <Link to="/MyProfile"><i className="fa-solid fa-address-card"></i></Link>  : 
                <Link to="/Home"><i className="fa-solid fa-address-card"></i></Link>

        }

        {user && user.is_admin === true ? (
          <Link to="/Admin">Admin</Link>
        ): null}
        
        {isLoggedIn ? <Logout handleLogout={handleLogout} setUser={setUser} setIsLoggedIn={setIsLoggedIn}/> : null}
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default Navbar;