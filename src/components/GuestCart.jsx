import React, { useState, useEffect } from "react";
import "./guestCart.css";
import Footer from "./Footer";
import { RingLoader } from "react-spinners";
import StripeCheckout from "react-stripe-checkout";
import { makePayment } from "../api-adapter";
import STRIPE_PUBLISHABLE from "../constants/Stripe";
import "./loading.css";
import "./userCart.css";
import { useNavigate } from "react-router-dom";

const GuestCart = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  function handleBack() {
    navigate("/products");
  }
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, []);

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("guestCart"))
  );

  //getting total price
  let priceForStripe = 0;
  let displayQuantity = 1;
  useEffect(() => {
    for (let i = 0; i < cart.length; i++) {
      priceForStripe =
        priceForStripe + cart[i].product.price * cart[i].product.quantity;
      console.log(priceForStripe);
    }
  }, [cart]);

  async function handleDelete(productID) {
    let preexistingCart = JSON.parse(localStorage.getItem("guestCart"));
    let newCart = [];
    let tempCart = 0;

    for (let i = 0; i < preexistingCart.length; i++) {
      tempCart = preexistingCart[i];

      if (tempCart.tempID == productID) {
        preexistingCart.splice(i, 1);
        break;
      }
    }
    console.log(preexistingCart);
    let toBeSet = JSON.stringify(preexistingCart);
    localStorage.setItem("guestCart", toBeSet);

    setCart(JSON.parse(localStorage.getItem("guestCart")));
  }

  const [quantityToSend, setQuantityToSend] = useState(0);

  async function handleQuantityChange(e) {
    e.preventDefault();
    setQuantityToSend(parseInt(e.target.value));
  }

  async function clearCart() {
    setCart([]);
  }

  async function handleUpdateQuantity(productID) {
    console.log(quantityToSend);
    updateQuantity(productID, quantityToSend);
  }

  async function updateQuantity(productID, quantityGiven) {
    let preexistingCart = JSON.parse(localStorage.getItem("guestCart"));
    let newCart = [];
    let tempCart = 0;

    for (let i = 0; i < preexistingCart.length; i++) {
      tempCart = preexistingCart[i];

      if (tempCart.tempID == productID) {
        preexistingCart[i].product.quantity = quantityGiven;
        break;
      }
    }

    let toBeSet = JSON.stringify(preexistingCart);
    localStorage.setItem("guestCart", toBeSet);

    setCart(JSON.parse(localStorage.getItem("guestCart")));
  }

  return (
    <div>
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
        <div id="newWhole">
          <button onClick={handleBack} className="checkoutButton">
            Continue Shopping
          </button>
          <StripeCheckout
            stripeKey={STRIPE_PUBLISHABLE}
            token={makePayment}
            name="Guest cart"
            amount={priceForStripe}
            className="wholeCheckout"
          >
            <button className="checkoutButton">Checkout Your Cart</button>
          </StripeCheckout>
          <h1 id="header">Cart</h1>
          <div id="guestCartContainer">
            {cart.length ? (
              cart.map((product) => {
                console.log(product);
                return (
                  <div key={`product-${product.product.id}`} className="productBox">
                    <div className="productName">{product.product.name}</div>

                    <div className="productPrice">
                      Price: ${product.product.price / 100}
                    </div>
                    <div className="quantity">
                      Quantity: {product.product.quantity}
                    </div>
                    <img
                      id="productImage"
                      src={`${product.product.image_url}`}
                    />

                    <div id="allthebuttons">
                      <button
                        id="leftButtonCart"
                        onClick={() => handleDelete(product.product.id)}
                      >
                        Delete
                      </button>

                      <select
                        id="selectedQuantity"
                        onChange={handleQuantityChange}
                      >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            product.product.id,
                            product.product.quantity
                          )
                        }
                        id="rightButtonCart"
                      >
                        Update Quantity
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>No Items In Your Cart </div>
            )}
          </div>
          <button onClick={() => clearCart()}>Clear cart</button>
        </div>
      )}
    </div>
  );
};

export default GuestCart;
