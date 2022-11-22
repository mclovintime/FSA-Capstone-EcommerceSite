import React, { useState, useEffect } from "react";
import { getProducts } from "../api-adapter";
import "./products.css";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      let placeholder = await getProducts();
      console.log(placeholder);
      setProducts(placeholder.products);
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>products</h1>
      <div id="container">
        {products.length ? (
          products.map((product) => {
            return (
              <div className="productBox">
                <div className="productName">{product.name}</div>
                <div className="productDescription">
                  Description: {product.description}
                </div>
                <div className="productInStock">
                  In stock: {product.inStock}
                </div>
                <div className="productID">Price: {product.price}</div>
                <img id="productImage" src={`${product.image_url}`} />
                <button>Add to cart</button>
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

export default Products;
