import React, {useState, useEffect} from "react";
import {Navbar} from './'
import LoginPage from "./LoginPage";
import Products from "./Products";
import Register from "./Register";
import { getProducts } from "../api-adapter";

import {
  RouterProvider,
  Route,
  Link,
  Switch,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";


const Main = () => {
  const [user, setUser] = useState("")


  const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<Navbar />} >
       
  
          <Route path="/login" element={<LoginPage/>}></Route>
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
