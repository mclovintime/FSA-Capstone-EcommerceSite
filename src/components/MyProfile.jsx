import React, { useState, useEffect } from 'react'

const MyProfile = (props) => {
    const user = props.user

    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [update, setUpdate] = useState(false);

    
  useEffect(() => {
    setNewName(user.username);
    setNewEmail(user.email);
    console.log(user.email)

  }, [user]);


  return (
    <div>
        <h3>Hey {user.username}!</h3>
    </div>
  )
}

export default MyProfile
