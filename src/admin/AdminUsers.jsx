import React, {useEffect, useState} from 'react'
import { getAllUsers } from '../api-adapter'

 const AdminUsers = () => {
    const [users, setUsers] = useState([])

useEffect(() => {
    async function fetchUsers() {
        let allUsers = await getAllUsers()
        console.log(allUsers);
        setUsers(allUsers.users);
    }
    fetchUsers()
},[])
    
    
  return (
    <div className="adminusers-container">
        <h3>User Data</h3>
        {users.length ? (
            users.map((user) => {
                return (
                    <div key={`adminuser-${user.id}`}>
                    <div className="userName">{user.username}</div>
                    </div>
                )
            })
        ) : (
            <div>Loading</div>
        )}

    </div>  

  )
}

export default AdminUsers
