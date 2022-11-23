import React, {useState, useEffect} from "react";
import {Navbar} from './'
import LoginPage from "./LoginPage";
import Products from "./Products";
import Register from "./Register";
import { getProducts, authUser } from "../api-adapter";

import {
  RouterProvider,
  Route,
  Link,
  Switch,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";


const Main = () => {
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken && !isLoggedIn) {
      async function fetchUser() {
        const me = await authUser(localToken);
        setUser(me);
        setIsLoggedIn(true)
      }
      fetchUser();
    }
  }, [isLoggedIn]);


  const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<Navbar setUser={setUser} user={user} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} >
       
  
          <Route path="/login" element={<LoginPage setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/products" element={<Products/>}></Route>
        </Route>
      )
    );

  return(
      <main>
          <div id="main">
              <RouterProvider router={router}></RouterProvider>
          </div>
      </main>
  )

};

export default Main;
