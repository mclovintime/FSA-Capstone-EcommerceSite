import React, {useState, useEffect} from "react";
// import submit login and the register login


const LoginPage = () => {

    async function submitLogin()    {
        // 
    }

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return(
<div>
    <h1>hello testing</h1>
   

        <h3>Username:</h3>
    <input
          type="text"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
          <h3>Password:</h3>
    <input
          type="text"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button onClick={() => submitLogin()}>Login</button>
</div>
    )
}

export default LoginPage;