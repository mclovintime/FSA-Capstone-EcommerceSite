import { React, useState, useEffect } from "react";
import { getOrderHistory } from "../api-adapter";
import { useNavigate } from "react-router-dom";

const OrderHistory = (props) => {
  //// CHANGE THE STATE FROM AN ARRAY TO SOMETHING ELSE AND MAYBE YOU CAN MAKE IT WORK?
  const [history, setHistory] = useState([]);

  const indexed = history[0];

  const products = props.products;
  const navigate = useNavigate();
  async function fetchHistory() {
    const items = await getOrderHistory();
    setHistory(items);
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  function handleBackToMyCart(e) {
    e.preventDefault();
    navigate("/mycart/cart_items");
  }

  return (
    <div>
      <h1>Order History</h1>
      <button onClick={handleBackToMyCart} className="checkoutButton">
        Your Current Cart
      </button>

      <div id="cartContainer">
        {indexed && indexed.length ? (
          indexed.map((cart) => {
            return (
              <div key={`cartItem-${cart.id}`}>
                {products && products.length ? (
                  products.map((product) => {
                    if (cart.productId === product.id) {
                      return (
                        <div
                          key={`product-${product.id}`}
                          className="cartItemBox"
                        >
                          <div className="cartItemName">{product.name}</div>

                          <div className="cartItemID">
                            Price: ${product.price / 100}
                          </div>
                          <div>Quantity: {cart.quantity}</div>

                          <img
                            id="cartItemImage"
                            src={`${product.image_url}`}
                          />
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
    </div>
  );
};

export default OrderHistory;
