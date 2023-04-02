import React, { useState, useEffect } from "react";
import { Navbar, UserCart } from "./";
import LoginPage from "./LoginPage";
import Products from "./Products";
import Register from "./Register";
import { authUser, getProducts, getUserCart } from "../api-adapter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SingleProduct from "./SingleProduct";
import Home from "./Home";
import "./Footer.css";
import GuestCart from "./GuestCart";
import Footer from "./Footer";
import ContactForm from "./ContactForm";
import AdminPage from "../admin/AdminPage";
import AdminUsers from "../admin/AdminUsers";
import AdminProducts from "../admin/AdminProducts";
import OrderHistory from "./OrderHistory";
import MyProfile from "./MyProfile";
// import "./loading.css"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RingLoader } from "react-spinners";

const Main = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [quantity, setCount] = useState(0);
  const [userCart, setUserCart] = useState([]);

  async function fetchUserCart() {
    const allCart = await getUserCart();
    setUserCart(allCart);
  }

  useEffect(() => {
    fetchUserCart();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      let placeholder = await getProducts();
      setProducts(placeholder.products);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken && !isLoggedIn) {
      async function fetchUser() {
        const me = await authUser(localToken);
        setUser(me);
        setIsLoggedIn(true);
      }
      fetchUser();
    }
  }, [isLoggedIn]);

  return (
    <main>
      {loading ? (
        <div id="theLoader">
          <RingLoader
            id="ringer"
            size={150}
            color={"#d636d0"}
            loading={loading}
          />{" "}
        </div>
      ) : (
        <div id="main">
          <Router>
            <Navbar
              setUser={setUser}
              user={user}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
            <Routes>
              <Route exact path="/" element={<Home />} />

              <Route
                path="/login"
                element={
                  <LoginPage setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
                }
              />
              <Route
                path="/orderhistory"
                element={<OrderHistory products={products} />}
              />
              <Route path="/register" element={<Register />} />
              <Route
                path="/products"
                element={
                  <Products
                    user={user}
                    userCart={userCart}
                    setUserCart={setUserCart}
                    fetchUserCart={fetchUserCart}
                    products={products}
                    setProducts={setProducts}
                  />
                }
              />
              <Route path="/guestcart" element={<GuestCart />} />
              <Route
                path="/product/:productId"
                element={
                  <SingleProduct
                    userCart={userCart}
                    setUserCart={setUserCart}
                    products={products}
                    user={user}
                    quantity={quantity}
                    setCount={setCount}
                  />
                }
              />
              <Route
                path="/mycart/cart_items"
                element={
                  <UserCart
                    products={products}
                    setProducts={setProducts}
                    quantity={quantity}
                    setCount={setCount}
                    userCart={userCart}
                    setUserCart={setUserCart}
                    fetchUserCart={fetchUserCart}
                    user={user}
                  />
                }
              />
              <Route path="/contactform" element={<ContactForm />} />
              <Route path="/Admin" element={<AdminPage user={user} />} />
              <Route path="/AdminUsers" element={<AdminUsers user={user} />} />
              <Route
                path="/AdminProducts"
                element={<AdminProducts user={user} />}
              />
              <Route path="/Home" element={<Home />} />
              <Route
                path="/MyProfile"
                element={<MyProfile user={user} products={products} />}
              />
            </Routes>
            <Footer />
          </Router>

          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="light"
          />
        </div>
      )}
    </main>
  );
};

export default Main;
