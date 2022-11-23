import React, { useState, useEffect } from "react";
import { getProducts } from "../api-adapter";
import "./products.css";
import {Link} from "react-router-dom"

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
              
              <div  key={`product-${product.id}`} className="productBox">
                

                <div className="productName">{product.name}</div>
                <div className="productDescription">
                  Description: {product.description}
                </div>
                <div className="productDescription">
                {` testing product id ${product.id}`}
                </div>
                
                <div className="productInStock">
                  In stock: {product.stock}
                </div>
                <div className="productID">Price: {product.price}</div>
                <img id="productImage" src={`${product.image_url}`} />
                <button>Add to cart</button>
                <Link to={`/product/${product.id}`}><button>Display More Info</button></Link>
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
