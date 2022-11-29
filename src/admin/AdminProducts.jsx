import React, { useState, useEffect } from "react";
import { getProducts } from "../api-adapter";

import { Link, useNavigate } from "react-router-dom";
import CreateProduct from "./CreateProduct";



const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchProducts() {
      let placeholder = await getProducts();
      console.log(placeholder);
      setProducts(placeholder.products);
    }
    fetchProducts();
  }, []);

 
  function handleBackToMyCart(e){
    e.preventDefault()
    navigate("/mycart/cart_items")
  }
  
  return (
    <div>
      <h2>All Products</h2>
      <CreateProduct/>
      <div id="container">
        {products.length ? (
          products.map((product) => {
            return (
              <div key={`product-${product.id}`} className="productBox">
                <div className="productName">{product.name}</div>
                <div className="productDescription">
                  Description: {product.description}
                </div>
                <div className="productDescription">
                  {` testing product id ${product.id}`}
                </div>

                <div className="productInStock">In stock: {product.stock}</div>
                <div className="productID">Price: {product.price}</div>
                <img id="productImage" src={`${product.image_url}`} />
                <button>Add to cart</button>
                <Link to={`/product/${product.id}`}>
                  <button>Display More Info</button>
                </Link>
                
                <button onClick={handleBackToMyCart}>My Cart</button>
              
              <button>Update Product </button>
              <button>Delete Product</button>
              </div>
            );
          })
        ) : (
          <div>Loading your products... </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;