import React from "react";

const LoggedIn = (props) => {
  const user = props.user;

  return (
    <div>
      <h3> Welcome, {user.username ? user.username : "Guest"} </h3>
    </div>
  );
};

export default LoggedIn;
