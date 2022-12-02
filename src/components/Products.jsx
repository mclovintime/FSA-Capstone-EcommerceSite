import React, { useState, useEffect } from "react";
import {
  addProductToUserCart,
  getProducts,
  getProductsById,
  getUserCart,
  updateQuantity
} from "../api-adapter";
import "./products.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminProducts from "../admin/AdminProducts";
import Footer from "./Footer";

const Products = (props) => {
  const user = props.user;
  let existingItems = [];

  const [products, setProducts] = useState([]);
  const userCart = props.userCart;
  const setUserCart = props.setUserCart;
  const fetchUserCart = props.fetchUserCart;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      let placeholder = await getProducts();
      // console.log(placeholder);
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
    if (userCart) {
      const quantity = 1;
      const addedToCart = await addProductToUserCart(
        productId,
        price,
        quantity
      );
      console.log("addedToCart", addedToCart);
      if (addedToCart.message) {
        const mappedForUpdate = await Promise.all(userCart.map(async (item) => {
          if (item.productId == productId) {
            console.log(item, "item ")
            const updated = await  updateQuantity(item.id, item.quantity + 1)
                  return updated
          } else {
            return item;
          }
        }));
        setUserCart(mappedForUpdate);
      } else {
        setUserCart([...userCart, addedToCart]);
      }
    }
  };

  async function addToCart(productId) {
    console.log(productId, "id of the thing we clicked");
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

  return (
    <div>
      <h1 className="WholeProducts">products</h1>
      <div id="container">
        {products.length ? (
          products.map((product) => {
            return (
              <div key={`product-${product.id}`} className="productBox">
                <div className="productName">{product.name}</div>
                <div className="productDescription">{product.description}</div>
                {/* <div className="productDescription">
                  {` testing product id ${product.id}`}
                </div> */}

                <div className="productInStock">{product.stock} In Stock</div>
                <div className="productPrice">
                  Price: ${product.price / 100}
                </div>
                <img id="productImage" src={`${product.image_url}`} />

                {user ? (
                  <button onClick={() => addProduct(product.id, product.price)}>
                    Add to cart bingbong
                  </button>
                ) : (
                  <button onClick={() => addToCart(product.id, product.price)}>
                    Add to Cart
                  </button>
                )}

                <Link to={`/product/${product.id}`}>
                  <button>Display More Info</button>
                </Link>

                <button onClick={handleBackToMyCart}>My Cart</button>
              </div>
            );
          })
        ) : (
          <div>Loading your products... </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Products;
