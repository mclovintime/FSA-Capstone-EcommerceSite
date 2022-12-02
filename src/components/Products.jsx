import React, { useState, useEffect } from "react";
import {
  addProductToUserCart,
  getProducts,
  getProductsById,
} from "../api-adapter";
import "./products.css";
import { Link, useNavigate } from "react-router-dom";
import AdminProducts from "../admin/AdminProducts";
import Footer from "./Footer";

import "./loading.css";
import { RingLoader } from "react-spinners";
import { toast } from "react-toastify";


const Products = (props) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const user = props.user;
  let existingItems = [];
   const successNotify = () => toast("Added to cart!")


  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      let placeholder = await getProducts();
      setProducts(placeholder.products);
    }
    fetchProducts();
  }, []);

  function handleBackToMyCart(e) {
    e.preventDefault();
    navigate("/mycart/cart_items");
  }


  const addProduct = async (productId, price) => {
    console.log("HELLO???");
    // pass props.quantitity into APTUC later, once that is fixed

    const addedToCart = await addProductToUserCart(productId, price);
    //fix quantitity
    console.log(addedToCart);
  };

  async function addToCart(productId) {
    // console.log(productId, "id of the thing we clicked");
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
      },

      
    };

    // console.log(
    //   localStorage.getItem("guestCart"),
    //   "testing response empty pointer"
    // );

    if (localStorage.getItem("guestCart") == "") {
      existingItems = [];
    } else {
      existingItems = JSON.parse(localStorage.getItem("guestCart"));
    }

    // console.log(typeof existingItems, "existing items type");

    if (!existingItems) {
      existingItems = [];
    }

    existingItems.push(newCartItem);
    localStorage.setItem("guestCart", JSON.stringify(existingItems));

    let tester = localStorage.getItem("guestCart");
    // console.log(tester, "tester right here");

     
  }


  return (
    <div>

{
        loading ? <div id="theLoader"><RingLoader id="ringer"
        
        size={150}
        color={"#d636d0"}
        loading={loading}
        /> </div>: 

      <div id="wholeThing">
        <h1 className="WholeProducts"></h1>
        <div id="container">
          {products.length ? (
            products.map((product) => {
              return (
                <div key={`product-${product.id}`} className="productBox">
                  <div className="productName">{product.name}</div>
                  <div className="productDescription">
                    {product.description}
                  </div>
                  {/* <div className="productDescription">
                  {` testing product id ${product.id}`}
                </div> */}

                  <div className="productInStock">{product.stock} In Stock</div>
                  <div className="productPrice">${product.price / 100}</div>
                  <img id="productImage" src={`${product.image_url}`} />

                  <div id="buttonContainer">
                    {user ? (
                      <button
                        id="leftButton"
                        class="productButton"
                        onClick={() => addProduct(product.id, product.price)}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <button
                        id="leftButton"
                        class="productButton"
                        onClick={() => addToCart(product.id, product.price)}
                      >
                        Add to Cart
                      </button>
                    )}

                    <Link to={`/product/${product.id}`}>
                      <button id="middleButton" class="productButton">
                        More Info
                      </button>
                    </Link>

                    <button
                      id="rightButton"
                      class="productButton"
                      onClick={handleBackToMyCart}
                    >
                      My Cart
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div id="loadingProducts">Loading your products... </div>
          )}
        </div>
        <Footer />

      </div>
}
    </div>
  );
};

export default Products;
