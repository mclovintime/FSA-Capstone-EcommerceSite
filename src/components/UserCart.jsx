import { React, useState, useEffect } from "react";
import { getUserCart, deleteCartItem } from "../api-adapter";
import { Link, useNavigate, useParams } from "react-router-dom";

const UserCart = (props) => {
  const {quantity, setCount} = useParams;
  console.log(props, "wassup")
  const [userCart, setUserCart] = useState([]);
  const [cartItemId, setCartItemId] = useState(0);
  const [selectedItem, setSelectedItem] = useState();
  const products = props.products;
  const navigate = useNavigate();

  async function handleNewDelete(productId) {
console.log(productId,"DELETE PRODUCTID")
    const cartItemId = Number(productId);
    const deleted = await deleteCartItem(cartItemId);
    
    
  }


  useEffect(() => {
    async function fetchUserCart() {
      const allCart = await getUserCart();
      console.log(allCart);
      setUserCart(allCart);
    }
    fetchUserCart();
  }, []);

  function handleBack() {
    navigate("/products");
  }


  const handleSelectChange = (event) => {
    const id = event.target.value;
    const chosenItem = userCart.find((item) => item.id == id);
    setSelectedItem(chosenItem);
  };

  async function handleDelete(e) {
    e.preventDefault();
    // const cartItemId = Number(selectedItem.id);
    const deletedCartItem = await deleteCartItem(cartItemId);
    // if (deleted.success) {
      
      // navigate("/mycart/cart_items");
    // }
  }


  
  async function handleNewDelete(productId) {
console.log(productId,"DELETE PRODUCTID")
    const cartItemId = Number(productId);
    const deleted = await deleteCartItem(cartItemId);
    console.log(deleted, "here is deleted")
    if (deleted.success) {
      navigate("/mycart/cart_items");
    }
  }

  let incrementCount = () => {
    props.setCount(props.quantity + 1);
  };
  
  let decrementCount = () => {
    if(props.quantity > 0){props.setCount(props.quantity - 1)};
  };


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
        {userCart.length ? (
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
                          <button onClick={() => handleNewDelete(cartItem.id)}> Delete </button>
                          <img id="productImage" src={`${product.image_url}`} />
                          {/* <button>Add to cart</button> */}
                          <Link to={`/product/${product.id}`}>
                            <button>Product Details</button>
                          </Link>
                          {/* <button onClick={handleBack}>Go Back</button> */}
                          <div>
                          <h3>
                            Quantity:
                            <button onClick={decrementCount}>
                              -
                            </button>
                            <div>
                              {props.quantity}
                            </div>
                            <button onClick={incrementCount}>
                              +
                            </button>
                          </h3>
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
    </div>
  );
};

export default UserCart;
