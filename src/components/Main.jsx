import React, {useState, useEffect} from "react";
import {Navbar} from './'
import LoginPage from "./LoginPage";
import Products from "./Products";
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


  const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<Navbar />} >
       
  
          <Route path="/login" element={<LoginPage/>}></Route>
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
