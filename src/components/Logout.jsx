import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Logout = (props) => {
  const user = useState("");
 

  async function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    props.setIsLoggedIn(false);
    props.setUser("");
    window.location.reload()
  }

  return (
    <div>
      <form onSubmit={handleLogout}>
        <button id="logoutBtn" type="submit" >
          Logout
        </button>
        
      </form>
    </div>
  );
};
export default Logout;