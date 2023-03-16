import { React, useState, useEffect } from "react";
import {
  getUserCart,
  deleteCartItem,
  updateQuantity,
  checkoutCart,
  getOrderHistory
} from "../api-adapter";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Checkout.css";
import "./userCart.css";
import StripeCheckout from "react-stripe-checkout";
import { makePayment } from "../api-adapter";
import STRIPE_PUBLISHABLE from "../constants/Stripe";

// import "./userCart.css";

const UserCart = (props) => {
  //--------PROPS--------//
  const userCart = props.userCart;
  const setUserCart = props.setUserCart;
  const products = props.products;
  const user = props.user;
  
  //--------PARAMS AND NAV--------//
  const navigate = useNavigate();
  function handleBack() {
    navigate("/products");
  }
  //--------STATE--------//
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  const [cartItemId, setCartItemId] = useState(0);
  const [selectedItem, setSelectedItem] = useState();
  //--------FUNCTIONS--------//
  async function handleNewDelete(productId) {
   
    const cartItemId = Number(productId);
    const deleted = await deleteCartItem(cartItemId);
  }


  function handleQuantChange(e) {
    const val = Number(e.target.value);
    setSelectedQuantity(val);
  }
  async function settingNewQuant(cartItemId) {
    const updatedQuant = await updateQuantity(cartItemId, selectedQuantity);
    const mappedForUpdate = userCart.map((item) => {
      if (item.id == cartItemId) {
        return updatedQuant;
      } else {
        return item;
      }
    });
    setUserCart(mappedForUpdate);
  }

  async function handleNewDelete(cartItemId) {
    const deleted = await deleteCartItem(cartItemId);
    if (deleted.success) {
      const newCart = userCart.filter((item) => {
        const bool = !(item.id == cartItemId);
     
        return bool;
      });
      setUserCart(newCart);
    } else {
      //send notification that contains deleted.message
    }
  }

fetch

  async function handleCheckout() {
    const checkout = await checkoutCart();
  
  if (checkout) {
    setUserCart(userCart)}
  }



  let totalPrice = 0;

  if (userCart !== []) {
    for (let i = 0; i < userCart.length; i++) {
      totalPrice = totalPrice + (userCart[i].price * userCart[i].quantity);
      
    }
  }

  return (
    <div>
      <h1 className="cartTitle">My Cart</h1>
      <button onClick={handleBack} className="checkoutButton">
        Continue Shopping
      </button>
      <StripeCheckout
                    stripeKey={STRIPE_PUBLISHABLE}
                    token={makePayment}
                    name={`${user.username}'s Cart`}
                    amount={totalPrice}
                    className="wholeCheckout"
                  >
                    <button onClick={handleCheckout} className="checkoutButton">
                      Checkout Your Cart
                    </button>
                  </StripeCheckout>

      {/* <Checkout products={products} userCart={userCart}/> */}
      {/* <select onChange={handleSelectChange}>
        {userCart.map((item) => (
          <option key={item.id} value={item.id}>
            price: {item.price}
            quantity: {item.quantity}
            Product Id: {item.id}
          </option>
        ))}
      </select> */}

      <div id="cartContainer">
        {userCart && userCart.length ? (
          userCart.map((cartItem) => {
          
            return (
              <div key={`cartItem-${cartItem.id}`}>
                {products && products.length ? (
                  products.map((product) => {
                    // console.log(product, 'product')
                    if (cartItem.productId === product.id) {
                      return (
                        <div
                          key={`product-${product.id}`}
                          className="cartItemBox"
                        >
                          <div className="cartItemName">{product.name}</div>
                          {/* <div className="productDescription">
                            Description: {product.description}
                          </div> */}
                          {/* <div className="productDescription">
                            {` testing product id ${product.id}`}
                          </div> */}

                          <div className="cartItemInStock">
                            In stock: {product.stock > 0 ? "Yes" : "No"}
                          </div>
                          <div className="cartItemID">
                            Price: ${product.price / 100}
                          </div>
                          <div>Quantity: {cartItem.quantity}</div>

                          <img id="cartItemImage" src={`${product.image_url}`} />
                          {/* <button>Add to cart</button> */}

                          <div id="bottomRowContainer">
                            <button
                              id="deleteButton"
                              className="cartButtons"
                              onClick={() => handleNewDelete(cartItem.id)}
                            >
                              {" "}
                              Delete{" "}
                            </button>
                            <div id="quantityStuff">
                              <button
                                className="cartButtons"
                                onClick={() => settingNewQuant(cartItem.id)}
                                id="submitnewQuantity"
                              >
                                Update Count
                              </button>
                              <select
                                id="dropdown"
                                className="cartButtons"
                                onChange={handleQuantChange}
                              >
                                <option id="selectedQuantity" value="0">
                                  0
                                </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                            </div>
                          </div>
                        
                        </div>
                      );
                      
                    }
                  
                  })
                ) : (
                  <div>Loading your products... </div>
                )}
              </div>
            );
          })
        ) : (
          <div>Empty cart!</div>
        )}
      </div>
      {/* <Link to="/checkout"><button>Ready To Checkout</button></Link>
      <button onClick={handleCheckout}>Checkout Backend Test</button> */}
    </div>
  );
};

export default UserCart;
