import React, { useState } from "react";
import { createProduct } from "../api-adapter/index";
import "./createProduct.css";

const CreateProduct = (props) => {
  const products = props.products;
  const setProducts = props.setProducts;
  const fetchProducts = props.fetchProducts;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [detailed_description, setDetailedDescription] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [image_URL, setImage_URL] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const newProduct = await createProduct(
      name,
      description,
      detailed_description,
      stock,
      image_URL,
      price
    );
    if (products) {
      let allProducts = await fetchProducts();
      if (allProducts) {
        setProducts(allProducts.products);
        fetchProducts();
      }
    }
  }

  return (
    <div className="adminproduct-container">
      <h3>Create New Product</h3>
      <div id="theForms">
        <form onSubmit={handleSubmit} className="adminproduct">
          <input
            class="myInputs"
            type="text"
            name="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Product Name"
          />
          <input
            class="myInputs"
            type="text"
            name="description"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Product Description"
          />

          <input
            class="myInputs"
            type="text"
            name="inStock"
            placeholder="quantity"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            label="Product InStock"
          />

          <input
            class="myInputs"
            type="text"
            name="image"
            placeholder="image url"
            value={image_URL}
            onChange={(e) => setImage_URL(e.target.value)}
            label="Product Image"
          />

          <input
            class="myInputs"
            type="number"
            min="0"
            step="0.01"
            name="price"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            label="Product Price"
          />
          <textarea
            className="createproduct-description"
            type="text"
            name="detailed_description"
            placeholder="detailed description"
            value={detailed_description}
            onChange={(e) => setDetailedDescription(e.target.value)}
            label="Detailed Product Description"
          />
        </form>
        <button className="editproduct-button" type="submit">
          Create Product
        </button>
      </div>
    </div>
  );
};

export default CreateProduct;
