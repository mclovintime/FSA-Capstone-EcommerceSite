import React from "react";
import "./guestCart.css"

const GuestCart = () => {
  let cart = JSON.parse(localStorage.getItem('guestCart'))

  async function handleDelete(productID)  {
    let preexistingCart = JSON.parse(localStorage.getItem('guestCart'))
    let newCart = []
    let tempCart = 0
    
    for (let i = 0 ; i < preexistingCart.length; i++) {
      tempCart = preexistingCart[i];
     
      console.log(tempCart.tempID, "is temp ID")
      console.log(productID, "productID")
      if (tempCart.tempID == productID)  {
        console.log("entering slice?")
        preexistingCart.splice(i, 1)
        break;
      }
    }
    console.log(preexistingCart, "the new cart")
    let toBeSet = JSON.stringify(preexistingCart)
    localStorage.setItem("guestCart", toBeSet)
    window.location.reload();
  }

  return (
   <div>
      <h1 id="header">Cart</h1>
      <div id="guestCartContainer">
        {cart.length ? (
          cart.map((product) => {
            return (
              <div key={`product-${product.id}`} className="productBox">
                <div className="productName">{product.product.name}</div>
                
                <div className="productPrice">Price: {product.product.price}</div>
                <img id="productImage" src={`${product.product.image_url}`} />
                <button onClick={() =>  handleDelete(product.product.id)}>Delete</button>
              </div>
            );
          })
          
        ) : (
          <div>Loading your cart... </div>
        )}
      </div>
      <button>Checkout</button>
      <button>Clear cart</button>
    </div>
  );
};

export default GuestCart;