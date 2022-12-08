import React, { useState, useEffect } from "react";
import { updateProduct } from "../api-adapter/index";
import "./editproduct.css";

const EditProduct = (props) => {
  const product = props.product;
  const products = props.products;
  const setProducts = props.setProducts;
  const fetchProducts = props.fetchProducts;

  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDetailedDescription, setNewDetailedDescription] = useState("");
  const [newStock, setNewStock] = useState("");
  const [newImage_URL, setNewImage_URL] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setNewName(product.name);
    setNewDescription(product.description);
    setNewDetailedDescription(product.detailed_description);
    setNewStock(product.stock);
    setNewImage_URL(product.image_url);
    setNewPrice(product.price);
  }, [product]);

  async function handleSubmit(e) {
    e.preventDefault();
    const update = e.target.id;
    const updated = await updateProduct(update, {
      name: newName,
      description: newDescription,
      detailed_description: newDetailedDescription,
      stock: newStock,
      image_url: newImage_URL,
      price: newPrice,
    });
    if (products) {
      let allProducts = await fetchProducts();
      if (allProducts) {
        setProducts(allProducts.products);
        fetchProducts();
      }
    }
    setUpdate(false);
  }

  return (
    <>
      <div className="edit-product">
        {update ? (
          <form
            onSubmit={handleSubmit}
            id={product.id}
            className="editproduct-container"
          >
            <h3>Update your product!</h3>
            <input
              className="editproduct-name"
              name="name"
              type="text"
              value={newName}
              placeholder="name"
              onChange={(e) => {
                setNewName(e.target.value);
              }}
            ></input>
            <input
              className="editproduct-description"
              name="description"
              type="text"
              value={newDescription}
              placeholder="description"
              onChange={(e) => {
                setNewDescription(e.target.value);
              }}
            ></input>

            <input
              className="editproduct-stock"
              name="stock"
              type="number"
              value={newStock}
              placeholder="stock"
              onChange={(e) => {
                setNewStock(e.target.value);
              }}
            ></input>
            <input
              className="editproduct-image"
              name="image"
              type="text"
              value={newImage_URL}
              placeholder="image URL"
              onChange={(e) => {
                setNewImage_URL(e.target.value);
              }}
            ></input>
            <input
              className="editproduct-price"
              name="price"
              type="text"
              value={newPrice}
              placeholder="price"
              onChange={(e) => {
                setNewPrice(e.target.value);
              }}
            ></input>

            <textarea
              className="editproduct-detailed-description"
              name="detailed description"
              type="text"
              value={newDetailedDescription}
              placeholder="detailed description"
              onChange={(e) => {
                setNewDetailedDescription(e.target.value);
              }}
            ></textarea>

            <button
              type="button"
              className="myproducts-button"
              onClick={() => {
                setUpdate(false);
              }}
            >
              Undo
            </button>
            <button type="submit" className="myproducts-button">
              Update product
            </button>
          </form>
        ) : (
          <button
            className="myproducts-button"
            type="submit"
            onClick={() => {
              setUpdate(true);
            }}
          >
            Edit Product
          </button>
        )}
      </div>
    </>
  );
};

export default EditProduct;
