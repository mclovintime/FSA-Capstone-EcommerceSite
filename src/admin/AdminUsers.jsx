import React, { useEffect, useState } from "react";
import { getAllUsers } from "../api-adapter";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      let allUsers = await getAllUsers();
      console.log(allUsers);
      setUsers(allUsers.users);
    }
    fetchUsers();
  }, []);

  return (
    <div className="adminusers-container">
      <h3>User Data</h3>
      {users.length ? (
        users.map((user) => {
          return (
            <div key={`adminuser-${user.id}`}>
              <div className="userId">
                User: #{`${user.id}`.padStart(4, "0")}
              </div>
              <div className="userName">Username: {user.username}</div>
              <div className="email">Email: {user.email}</div>
              <br></br>
            </div>
          );
        })
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default AdminUsers;
