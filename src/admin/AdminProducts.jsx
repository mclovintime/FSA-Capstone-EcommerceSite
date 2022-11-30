import React, { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "../api-adapter";

import { Link, useNavigate, useParams } from "react-router-dom";
import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct";
import DeleteProducts from "./DeleteProducts";




const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  // console.log(products, "woiehrpow")
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

  async function handleDelete(productId) {
    console.log(productId, "DELETE PRODUCTID");
    const adminProductId = Number(productId);
    const token = localStorage.getItem("token")
    const deleted = await deleteProduct(adminProductId, token);
    console.log(deleted, "here is deleted");
    // if (deleted.success) {
    //   navigate("/mycart/cart_items");
    // }
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
                {/* <div className="productDescription">
                  {` testing product id ${product.id}`}
                </div> */}

                <div className="productInStock">In stock: {product.stock}</div>
                <div className="productID">Price: {product.price}</div>
                <img id="productImage" src={`${product.image_url}`} />
                <button>Add to cart</button>
                <Link to={`/product/${product.id}`}>
                  <button>Display More Info</button>
                </Link>
                
                <button onClick={handleBackToMyCart}>My Cart</button>
              

              <EditProduct product={product}/>
              <button
              id={product.id ? `${product.id}` : null}
               onClick={() => handleDelete(product.id)}>
                
                Delete Product
              </button>
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