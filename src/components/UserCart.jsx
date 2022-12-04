import { React, useState, useEffect } from "react";
import { getUserCart, deleteCartItem, updateQuantity, checkoutCart } from "../api-adapter";
import { Link, useNavigate, useParams } from "react-router-dom";
import Checkout from "./Checkout";
// import "./userCart.css";

const UserCart = (props) => {

  //--------PROPS--------//
  const userCart = props.userCart
  const setUserCart = props.setUserCart
  const products = props.products;
  //--------PARAMS AND NAV--------//
  const navigate = useNavigate(); 
  function handleBack() {
    navigate("/products");
  }
  //--------STATE--------//
  const [selectedQuantity, setSelectedQuantity] = useState(0)

  const [cartItemId, setCartItemId] = useState(0);
  const [selectedItem, setSelectedItem] = useState();
  //--------FUNCTIONS--------//
  async function handleNewDelete(productId) {

    console.log(productId,"DELETE PRODUCTID")
    const cartItemId = Number(productId);
    const deleted = await deleteCartItem(cartItemId);  
  }

  function handleQuantChange(e){
    const val = Number(e.target.value)
    setSelectedQuantity(val)
  }
  async function settingNewQuant(cartItemId){
    
   const updatedQuant = await updateQuantity(cartItemId, selectedQuantity)
        const mappedForUpdate = userCart.map((item) => {
          if (item.id == cartItemId) {
              return updatedQuant
          } else {
            return item;
          }
        });
        setUserCart(mappedForUpdate);
    
  }
 
  async function handleNewDelete(cartItemId) {
  
    const deleted = await deleteCartItem(cartItemId);
    if(deleted.success){
      const newCart = userCart.filter((item)=>{
        const bool = !(item.id == cartItemId)
        console.log("IAM IRONMAN", item.id, cartItemId, bool)
       return bool
      })
      setUserCart(newCart)
    }
    else{
      //send notification that contains deleted.message
    }
    }
 



 async function handleCheckout() {
  const checkout = await checkoutCart();
  console.log(checkout)

 }


  return (
    <div>
      <h1>My Cart</h1>
      <button onClick={handleBack}>Continue Shopping</button>

      {/* <select onChange={handleSelectChange}>
        {userCart.map((item) => (
          <option key={item.id} value={item.id}>
            price: {item.price}
            quantity: {item.quantity}
            Product Id: {item.id}
          </option>
        ))}
      </select> */}


      <div id="container">
        {userCart && userCart.length ? (
          userCart.map((cartItem) => {
            return (
              <div key={`cartItem-${cartItem.id}`}>
                {products.length ? (
                  products.map((product) => {
                    if (cartItem.productId === product.id) {
                      return (
                        <div
                          key={`product-${product.id}`}
                          className="productBox"
                        >
                          <div className="productName">{product.name}</div>
                          {/* <div className="productDescription">
                            Description: {product.description}
                          </div> */}
                          {/* <div className="productDescription">
                            {` testing product id ${product.id}`}
                          </div> */}

                          <div className="productInStock">
                            In stock: {product.stock > 0 ? "Yes" : "No"}
                          </div>
                          <div className="productID">
                            Price: ${product.price / 100}
                          </div>
                          <div>Quantity: {cartItem.quantity}</div>

                          <img id="productImage" src={`${product.image_url}`} />
                          {/* <button>Add to cart</button> */}

                          <div id="bottomRowContainer">
                            <button id="deleteButton" class="cartButtons"
                              onClick={() => handleNewDelete(cartItem.id)}
                            >
                              {" "}
                              Delete{" "}
                            </button>
                            <div id="quantityStuff">
                              <button class="cartButtons"
                                onClick={() => settingNewQuant(cartItem.id)}
                                id="submitnewQuantity"
                              >
                                Update Count
                              </button>
                              <select id="dropdown" class="cartButtons"onChange={handleQuantChange}>
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
          <div>Loading your userCart... </div>
        )}
      </div>
      
      <Link to="/checkout"><button>Ready To Checkout</button></Link>
      <button onClick={handleCheckout}>Checkout Backend Test</button>

    </div>
  );
};

export default UserCart;