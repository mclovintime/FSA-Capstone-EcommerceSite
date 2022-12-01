import React, { useEffect, useState } from "react";
import "./SingleProduct.css"
import {
  getProductsById,
  addProductToUserCart,
  updateQuantity,
} from "../api-adapter";
import { useParams, useNavigate } from "react-router-dom";

const SingleProduct = (props) => {
  let existingItems = [];
  const user = props.user;
  console.log(user, "testing user");

  const [quantityCounter, setQuantityCounter] = useState(0);

  console.log(props, "props on single product here");

  const { productId, quantity, setCount } = useParams();
  console.log(productId, "productID");
  const [product, setProduct] = useState("");
  const [updatedQuantity, setUpdatedQuantity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function getSingleProduct() {
      let placeholder = await getProductsById(productId);
      // console.log(placeholder.products, "placeholder");
      setProduct(placeholder.products);
    }
    getSingleProduct();
  }, []);

  const [selectedQuantity, setSelectedQuantity] = useState(0);
  console.log(selectedQuantity);

  async function handleQuantChange(e) {
    const val = Number(e.target.value);
    setSelectedQuantity(val);
    console.log(selectedQuantity, "this is selected");
    const Num = Number(selectedQuantity);
    setUpdatedQuantity(Num);
    console.log(updatedQuantity, "this is updatedQuant");
  }

  async function settingNewQuant() {
    let id = product.id;
    console.log(selectedQuantity, "trying to feed this quant");
    await updateQuantity(id, selectedQuantity);
  }

  function addProductToGuestCart() {
    const tempID = product.id;
    const newCartItem = {
      tempID: tempID,
      product: {
        price: product.price,
        image_url: product.image_url,
        name: product.name,
        id: product.id,
      },
    };
    console.log(newCartItem, "newCartItem");

    console.log(
      localStorage.getItem("guestCart"),
      "testing response empty pointer"
    );

    if (localStorage.getItem("guestCart") == "") {
      existingItems = [];
    } else {
      existingItems = JSON.parse(localStorage.getItem("guestCart"));
    }

    console.log(typeof existingItems, "existing items type");

    if (!existingItems) {
      existingItems = [];
    }

    existingItems.push(newCartItem);
    localStorage.setItem("guestCart", JSON.stringify(existingItems));

    let tester = localStorage.getItem("guestCart");
    console.log(tester, "tester right here");
  }

  const addGuestProduct = async (e) => {
    e.preventDefault();
    const price = product.price;

    const placeholder = localStorage.getItem("guestCart");
    if (placeholder == undefined) {
      localStorage.setItem("guestCart", []);
    }

    // this will append to the pointer in localstorage named "guestCart"
    addProductToGuestCart(price, productId);

    //fix quantitity
    // console.log(addedToCart)
  };

  let incrementCount = () => {
    props.setCount(props.quantity + 1);
  };

  let decrementCount = () => {
    if (props.quantity > 0) {
      props.setCount(props.quantity - 1);
    }
  };

  function handleBack() {
    navigate("/products");
  }
  function handleBackToMyCart() {
    navigate("/mycart/cart_items");
  }

  const addProduct = async (e) => {
    e.preventDefault();
    const price = product.price;

    const addedToCart = await addProductToUserCart(
      productId,
      price,
      props.quantity
    );
    //fix quantitity
    console.log(addedToCart);
  };

  return product ? (
    <div>
      
      <div key={`product-${product.id}`} className="productBoxH">
        <div className="productNameH">{product.name}</div>
        <div className="productDescriptionH">
          Description: {product.description}
        </div>


        <div className="productInStock">In stock: {product.stock}</div>
        <div className="productID">Price: {product.price}</div>
        <img id="productImage" src={`${product.image_url}`} />
        <div>{product.detailed_description}</div>


        <div>
          <select onChange={handleQuantChange}>
            <option id="selectedQuantity" value="0">
              0
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button class="buttons" onClick={settingNewQuant} id="submitnewQuantity">
            Update Quantity
          </button>
        </div>
        {user ? (
          <button class="buttons" onClick={addProduct}>Add to cart</button>
        ) : (
          <button class="buttons"onClick={addGuestProduct}>Add to cart</button>
        )}

        <button class="buttons" onClick={handleBack}>Back To Products</button>
        <button class="buttons" onClick={handleBackToMyCart}>My Cart</button>
      </div>
      </div>
    </div>
  ) : (
    <div>Loading your product... </div>
  );
};

export default SingleProduct;
