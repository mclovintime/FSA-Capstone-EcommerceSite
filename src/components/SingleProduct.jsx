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
  // console.log(user, "testing user");

  const [quantityCounter, setQuantityCounter] = useState(0);

  // console.log(props, "props on single product here");

  const { productId, quantity, setCount } = useParams();
  // console.log(productId, "productID");
  const [product, setProduct] = useState("");
  const [updatedQuantity, setUpdatedQuantity] = useState(0);
  const navigate = useNavigate();
  const successNotify = () => toast("Added to cart!");

  useEffect(() => {
    async function getSingleProduct() {
      let placeholder = await getProductsById(productId);
      // console.log(placeholder.products, "placeholder");
      setProduct(placeholder.products);
    }
    getSingleProduct();
  }, []);

  // console.log(selectedQuantity);
  
  // async function handleQuantChange(e) {
    //   const val = Number(e.target.value);
    //   setSelectedQuantity(val);
    //   // console.log(selectedQuantity, "this is selected");
    //   const Num = Number(selectedQuantity);
    //   setUpdatedQuantity(Num);
    //   // console.log(updatedQuantity, "this is updatedQuant");
    // }
    
    // async function settingNewQuant() {
      //   let id = product.id;
      //   // console.log(selectedQuantity, "trying to feed this quant");
      //   await updateQuantity(id, selectedQuantity);
      // }
      
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
    // console.log(productId, "id of the thing we clicked");
    let existingItems
    let holder = await getProductsById(productId);
    console.log(holder, "holder, line 13, guest cart test")
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
      localStorage.setItem("guestCart", JSON.stringify(existingItems))
    
    } else {
      existingItems = JSON.parse(localStorage.getItem("guestCart"));
   
      const filteredItem =  existingItems.filter((item) => {
       
        return item.tempID == productId})
     console.log(filteredItem.length, "filtered Item")
       if (filteredItem.length) {
        console.log(typeof filteredItem[0].product.quantity)

        filteredItem[0].product.quantity = parseInt(filteredItem[0].product.quantity + 1)
      const filteredExistingItems = existingItems.filter((item)=> {
        return item.tempID != productId
      })
        filteredExistingItems.push(filteredItem[0])
        localStorage.setItem("guestCart", JSON.stringify(filteredExistingItems))
       } else {
        existingItems.push(newCartItem)
        localStorage.setItem("guestCart", JSON.stringify(existingItems))
       }

      

        };
   
    console.log(existingItems, "here is the guest cart!");


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
    console.log("HELLO???");
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
              console.log(item, "item ");
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
        <div className="productDescriptionH">
          Description: {product.description}
        </div>

        <div className="productInStock">In stock: {product.stock}</div>
        <div className="productID">Price: {product.price}</div>
        <img id="productImage" src={`${product.image_url}`} />
        <div>{product.detailed_description}</div>

        <div>
          <select className="updateDrop" onChange={handleQuantChange}>
          
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          {/* <button className="updateButton" onClick={settingNewQuant}>
            Update Quantity
          </button> */}
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
