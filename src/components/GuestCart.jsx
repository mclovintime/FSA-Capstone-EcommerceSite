import React, { useState, useEffect } from "react";
import "./guestCart.css";
import Footer from "./Footer";
import { RingLoader } from "react-spinners";
import StripeCheckout from "react-stripe-checkout";
import { makePayment } from "../api-adapter";
import STRIPE_PUBLISHABLE from "../constants/Stripe";
import "./loading.css"

const GuestCart = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, []);

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("guestCart"))
  );

  // let cart = ;
  console.log(cart);

  //getting total price
  let priceForStripe = 0
  useEffect(() => {
  
    for (let i = 0 ; i < cart.length ; i++) {
      priceForStripe = priceForStripe + (cart[i].product.price * cart[i].quantity)
      console.log(priceForStripe, "price here")
    }
  }, [cart]);

  async function handleDelete(productID) {
    let preexistingCart = JSON.parse(localStorage.getItem("guestCart"));
    let newCart = [];
    let tempCart = 0;

    for (let i = 0; i < preexistingCart.length; i++) {
      tempCart = preexistingCart[i];

      console.log(tempCart.tempID, "is temp ID");
      console.log(productID, "productID");
      if (tempCart.tempID == productID) {
        console.log("entering slice?");
        preexistingCart.splice(i, 1);
        break;
      }
    }
    console.log(preexistingCart, "the new cart");
    let toBeSet = JSON.stringify(preexistingCart);
    localStorage.setItem("guestCart", toBeSet);

    setCart(JSON.parse(localStorage.getItem("guestCart")));
  }

  const [quantityToSend, setQuantityToSend] = useState("");

  async function handleQuantityChange(e) {
    e.preventDefault();
    setQuantityToSend(e.target.value);
  }

  async function clearCart() {
    setCart([]);
  }

  async function handleUpdateQuantity(productID) {
    console.log(productID, "testing prod id");
    console.log(quantityToSend);
    updateQuantity(productID, quantityToSend);
  }

  async function updateQuantity(productID, quantityGiven) {
    if (quantityGiven == 0) {
      handleDelete(productID);
      return;
    }

    let preexistingCart = JSON.parse(localStorage.getItem("guestCart"));
    let newCart = [];
    let tempCart = 0;

    for (let i = 0; i < preexistingCart.length; i++) {
      tempCart = preexistingCart[i];

      if (tempCart.tempID == productID) {
        console.log("entering slice?");

        preexistingCart[i].quantity = quantityGiven;
        console.log(preexistingCart[i].quantity, "new quantity here");
        break;
      }
    }

    console.log(preexistingCart, "new cart out of loop");
    let toBeSet = JSON.stringify(preexistingCart);
    localStorage.setItem("guestCart", toBeSet);

    setCart(JSON.parse(localStorage.getItem("guestCart")));
  }

  return (
    <div>
      {
        loading ? <div id="theLoader"><RingLoader id="ringer"
        
        size={150}
        color={"#d636d0"}
        loading={loading}
        /> </div>: 
      <div id="newWhole">
        <StripeCheckout
                    stripeKey={STRIPE_PUBLISHABLE}
                    token={makePayment}
                    name="Guest cart"
                    amount={priceForStripe}
                    className="wholeCheckout"
                  >
                    <button className="checkoutButton">
                      Checkout Your Cart
                    </button>
                  </StripeCheckout>
        <h1 id="header">Cart</h1>
        <div id="guestCartContainer">
          {cart.length ? (
            cart.map((product) => {
              console.log(product)
              return (
                <div key={`product-${product.id}`} className="productBox">
                  <div className="productName">{product.product.name}</div>

                  <div className="productPrice">
                    Price: ${product.product.price / 100}
                  </div>
                  <div className="quantity">Quantity: {product.quantity}</div>
                  <img id="productImage" src={`${product.product.image_url}`} />
                  <button onClick={() => handleDelete(product.product.id)}>
                    Delete
                  </button>

                  <select onChange={handleQuantityChange}>
                    <option id="selectedQuantity" value="0">
                      0
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button
                    onClick={() => handleUpdateQuantity(product.product.id)}
                    id="submitnewQuantity"
                  >
                    Update Quantity
                  </button>
                </div>
              );
            })
          ) : (
            <div>No Items In Your Cart </div>
          )}
        </div>
        <button onClick={() => clearCart()}>Clear cart</button>
        <Footer></Footer>
      </div>
}
    </div>
  );
};

export default GuestCart;
