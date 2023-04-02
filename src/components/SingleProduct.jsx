import React, { useEffect, useState } from "react";
import "./SingleProduct.css";
import {
  getProductsById,
  addProductToUserCart,
  updateQuantity,
} from "../api-adapter";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SingleProduct = (props) => {
  let existingItems = [];
  const user = props.user;
  const userCart = props.userCart;
  const setUserCart = props.setUserCart;

  const [quantityCounter, setQuantityCounter] = useState(0);

  const { productId, quantity, setCount } = useParams();
  const [product, setProduct] = useState("");
  const [updatedQuantity, setUpdatedQuantity] = useState(0);
  const navigate = useNavigate();
  const successNotify = () => toast("Added to cart!");

  useEffect(() => {
    async function getSingleProduct() {
      let placeholder = await getProductsById(productId);
      setProduct(placeholder.products);
    }
    getSingleProduct();
  }, []);

  const [selectedQuantity, setSelectedQuantity] = useState(1);

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

  async function addToGuestCart() {
    let existingItems;
    let holder = await getProductsById(productId);
    let product = holder.products;
    const tempID = productId;
    const newCartItem = {
      tempID: tempID,
      product: {
        price: product.price,
        image_url: product.image_url,
        name: product.name,
        id: product.id,
        quantity: selectedQuantity,
      },
    };

    if (localStorage.getItem("guestCart") == null) {
      existingItems = [];
      existingItems.push(newCartItem);
      localStorage.setItem("guestCart", JSON.stringify(existingItems));
    } else {
      existingItems = JSON.parse(localStorage.getItem("guestCart"));

      const filteredItem = existingItems.filter((item) => {
        return item.tempID == productId;
      });
      if (filteredItem.length) {
        filteredItem[0].product.quantity = parseInt(
          filteredItem[0].product.quantity + 1
        );
        const filteredExistingItems = existingItems.filter((item) => {
          return item.tempID != productId;
        });
        filteredExistingItems.push(filteredItem[0]);
        localStorage.setItem(
          "guestCart",
          JSON.stringify(filteredExistingItems)
        );
      } else {
        existingItems.push(newCartItem);
        localStorage.setItem("guestCart", JSON.stringify(existingItems));
      }
    }

    localStorage.setItem("guestCart", JSON.stringify(existingItems));

    let tester = localStorage.getItem("guestCart");
  }

  function handleBack() {
    navigate("/products");
  }
  function handleBackToMyCart() {
    navigate("/mycart/cart_items");
  }

  const addUserProduct = async () => {
    const price = product.price;

    if (userCart) {
      const quantity = selectedQuantity;
      const addedToCart = await addProductToUserCart(
        productId,
        price,
        quantity
      );
      console.log("addedToCart", addedToCart);
      if (addedToCart.message) {
        const mappedForUpdate = await Promise.all(
          userCart.map(async (item) => {
            if (item.productId == productId) {
              const updated = await updateQuantity(item.id, item.quantity + 1);
              return updated;
            } else {
              return item;
            }
          })
        );
        setUserCart(mappedForUpdate);
      } else {
        setUserCart([...userCart, addedToCart]);
      }
    }
  };

  return product ? (
    <div>
      <div key={`product-${product.id}`} className="productBoxH">
        <div className="productNameH">{product.name}</div>
        <div className="productDescriptionH">{product.description}</div>

        <div className="productInStock">In stock: {product.stock}</div>
        <div className="productID">Price: ${product.price / 100}</div>
        <img id="productImage" src={`${product.image_url}`} />
        <div id="productDescription">{product.detailed_description}</div>

        <div>
          <select className="updateDrop" onChange={handleQuantChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        {user ? (
          <button
            className="buttons"
            onClick={() => {
              addUserProduct();
              successNotify();
            }}
          >
            Add to cart
          </button>
        ) : (
          <button
            className="buttons"
            onClick={() => {
              addToGuestCart();
              successNotify();
            }}
          >
            Add to cart
          </button>
        )}

        <button className="buttons" onClick={handleBack}>
          Back To Products
        </button>
        <button className="buttons" onClick={handleBackToMyCart}>
          My Cart
        </button>
      </div>
    </div>
  ) : (
    <div>Loading your product... </div>
  );
};

export default SingleProduct;
