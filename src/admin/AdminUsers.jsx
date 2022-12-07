import React, { useEffect, useState } from "react";
import { getAllUsers } from "../api-adapter";
import "./adminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    let allUsers = await getAllUsers();
    setUsers(allUsers.users);
  }
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div id="wholeList">
      <div className="adminusers-container">
        <h3 id="userHeader">User Data</h3>
        {users && users.length ? (
          users.map((user) => {
            return (
              <div id="contactSingle">
                <div key={`adminuser-${user.id}`}>
                  <div className="userId">
                    User: #{`${user.id}`.padStart(4, "0")}
                  </div>
                  <div className="userName">Username: {user.username}</div>
                  <div className="email">Email: {user.email}</div>
                  <div className="address">Address: {user.address}</div>
                  <br></br>
                </div>
              </div>
            );
          })
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
