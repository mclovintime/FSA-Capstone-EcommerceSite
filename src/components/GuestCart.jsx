import React from "react";
import "./guestCart.css"

const GuestCart = () => {
  let cart = JSON.parse(localStorage.getItem('guestCart'))


  return (
   <div>
      <h1 id="header">Cart</h1>
      <div id="guestCartContainer">
        {cart.length ? (
          cart.map((product) => {
            return (
              <div key={`product-${product.id}`} className="productBox">
                <div className="productName">{product.name}</div>
                
                <div className="productPrice">Price: {product.price}</div>
                <img id="productImage" src={`${product.image_url}`} />
                
              </div>
            );
          })
          
        ) : (
          <div>Loading your cart... </div>
        )}
      </div>
      <button>Checkout</button>
    </div>
  );
};

export default GuestCart;