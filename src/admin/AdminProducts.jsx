import React, { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "../api-adapter";
import { Link } from "react-router-dom";
import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct";
import "./loading.css";
import "./adminproducts.css";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    let placeholder = await getProducts();
    setProducts(placeholder.products);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function handleDelete(productId) {
    const adminProductId = Number(productId);
    const token = localStorage.getItem("token");
    const deleted = await deleteProduct(adminProductId, token);

    if (products) {
      let allProducts = await fetchProducts();
      if (allProducts) {
        setProducts(allProducts.products);
        fetchProducts();
      }
    }
  }

  return (
    <div>
      <h2 className="adminproducts-header">Product Data</h2>
      <CreateProduct
        products={products}
        fetchProducts={fetchProducts}
        setProducts={setProducts}
      />

      <div id="container">
        {products.length ? (
          products.map((product) => {
            return (
              <div key={`product-${product.id}`} className="productBox-admin">
                <div className="productName">{product.name}</div>
                <div className="productDescription">
                  Description: {product.description}
                </div>

                <div className="productInStock">In stock: {product.stock}</div>
                <div className="productID">Price: {product.price}</div>
                <img id="productImage" src={`${product.image_url}`} />
                <Link to={`/product/${product.id}`} className="moreinfo">
                  <button>Display More Info</button>
                </Link>

                <EditProduct
                  product={product}
                  products={products}
                  setProducts={setProducts}
                  fetchProducts={fetchProducts}
                />
                <button
                  id={product.id ? `${product.id}` : null}
                  onClick={() => handleDelete(product.id)}
                >
                  Delete Product
                </button>
              </div>
            );
          })
        ) : (
          <div id="loadingProducts">Loading your products... </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
