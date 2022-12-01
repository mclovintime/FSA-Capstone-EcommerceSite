import React from "react";

const LoggedIn = (props) => {
  console.log(props.user)
  const user = props.user;

  return (
    <div>
      <h3> Welcome, {user && user.username ? user.username : "Guest"} </h3>
    </div>
  );
};

export default LoggedIn;
