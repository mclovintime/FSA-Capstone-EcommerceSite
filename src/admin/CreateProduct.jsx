import React, { useState } from "react";
import { createProduct } from "../api-adapter/index";

const CreateProduct = (props) => {
  const products = props.products;
  const setProducts = props.setProducts;
  const fetchProducts = props.fetchProducts;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [detailed_description, setDetailedDescription] = useState("")
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
    <div className="myRoutines-container">
      <h3>Create New Product</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Product Name"
        />
        <input
          type="text"
          name="description"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Product Description"
        />

<input
          type="text"
          name="detailed_description"
          placeholder="Detailed Description"
          value={detailed_description}
          onChange={(e) => setDetailedDescription(e.target.value)}
          label="Detailed Product Description"
        />
        <input
          type="text"
          name="inStock"
          placeholder="How many are in stock?"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          label="Product InStock"
        />

        <input
          type="text"
          name="image"
          placeholder="image url"
          value={image_URL}
          onChange={(e) => setImage_URL(e.target.value)}
          label="Product Image"
        />

        <input
          type="number"
          min="0"
          step="0.01"
          name="price"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          label="Product Price"
        />

        <button className="editproduct-button" type="submit">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
