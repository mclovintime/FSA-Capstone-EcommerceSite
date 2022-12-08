import React, { useState, useEffect } from "react";
import { updateUser, getAllUsers } from "../api-adapter/index";
import { Link } from "react-router-dom";
import "./myProfile.css";
import OrderHistory from "./OrderHistory";

const MyProfile = (props) => {
  const user = props.user;

  const [newUserName, setNewUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [update, setUpdate] = useState(false);
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    let placeholder = await getAllUsers();
    setUsers(placeholder);
  }

  useEffect(() => {
    setNewUserName(user.username);
    setNewPassword(user.password);
    setNewEmail(user.email);
    setNewAddress(user.address);
    fetchUsers();
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();
    const update = e.target.id;
    const updated = await updateUser(update, {
      username: newUserName,
      email: newEmail,
      address: newAddress,
    });
    if (users) {
      let allUsers = await fetchUsers();
      if (allUsers) {
        setUsers(allUsers.users);
        fetchUsers();
      }
    }
    setUpdate(false);
  }

  return (
    <div className="edit-user">
      <h3 className="myprofile-header"> My Profile</h3>
      <div>
        <div className="userName">Username: {user.username}</div>
        <div className="email">Email: {user.email}</div>
        <div className="address">Address: {user.address}</div>
      </div>
      {update ? (
        <form onSubmit={handleSubmit} id={user.id} className="myprofile-form">
          <h3>Update your info!</h3>
          <input
            className="updateUsername"
            name="username"
            type="text"
            value={newUserName}
            placeholder="username"
            onChange={(e) => {
              setNewUserName(e.target.value);
            }}
          ></input>
          <input
            className="updateEmail"
            name="email"
            type="text"
            value={newEmail}
            placeholder="email"
            onChange={(e) => {
              setNewEmail(e.target.value);
            }}
          ></input>
          <input
            className="updateAddress"
            name="address"
            type="text"
            value={newAddress}
            placeholder="address"
            onChange={(e) => {
              setNewAddress(e.target.value);
            }}
          ></input>

          <div className="twobuttons">
            <button type="submit" className="updateuser-button">
              Update info
            </button>
            <button
              type="button"
              className="myproducts-button"
              onClick={() => {
                setUpdate(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          className="myprofile-button"
          type="submit"
          onClick={() => {
            setUpdate(true);
          }}
        >
          Edit Info
        </button>
      )}
      <div className="orderBtn">
        {user ? (
          <Link to="/orderhistory" className="orderhistory">
            Order History
          </Link>
        ) : (
          <Link to="/Home"></Link>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
