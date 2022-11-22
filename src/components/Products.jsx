import { getProducts } from "../api-adapter";
import React, {useState, useEffect} from "react";
// import submit login and the register login

const Products = () =>   {

    async function submitLogin()    {
        // 
    }

    const [username, setUsername] = useEffect("")
    const [password, setPassword] = useEffect("")

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

export default Products;