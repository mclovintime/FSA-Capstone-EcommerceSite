import React from "react";
import "./loggedIn.css";
import "./Navbar.css";

const LoggedIn = (props) => {
  console.log(props.user)
  const user = props.user;

  return (
    <div>
      <h3 id="fixingWelcome" className="leftNav"> Welcome, {user && user.username ? user.username : "Guest"} </h3>
    </div>
  );
};

export default LoggedIn;
