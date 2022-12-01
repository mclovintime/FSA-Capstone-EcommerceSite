import React, { useState, useEffect } from "react";
import { updateProduct } from "../api-adapter/index";

const EditProduct = (props) => {
  const product = props.product;
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDetailedDescription, setNewDetailedDescription] =useState("")
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
  }

  return (
    <>
      <div className="edit-product">
        {update ? (
          <form onSubmit={handleSubmit} id={product.id}>
            <h3>Update your product!</h3>
            <input
              name="name"
              type="text"
              value={newName}
              placeholder="name"
              onChange={(e) => {
                setNewName(e.target.value);
              }}
            ></input>
            <input
              name="description"
              type="text"
              value={newDescription}
              placeholder="description"
              onChange={(e) => {
                setNewDescription(e.target.value);
              }}
            ></input>

<input
              name="detailed description"
              type="text"
              value={newDetailedDescription}
              placeholder="detailed description"
              onChange={(e) => {
                setNewDetailedDescription(e.target.value);
              }}
            ></input>
            <input
              name="stock"
              type="number"
              value={newStock}
              placeholder="stock"
              onChange={(e) => {
                setNewStock(e.target.value);
              }}
            ></input>
            <input
              name="image"
              type="text"
              value={newImage_URL}
              placeholder="image URL"
              onChange={(e) => {
                setNewImage_URL(e.target.value);
              }}
            ></input>
            <input
              name="price"
              type="text"
              value={newPrice}
              placeholder="price"
              onChange={(e) => {
                setNewPrice(e.target.value);
              }}
            ></input>

            <button
              type="button"
              className="myproducts-button"
              onClick={() => {
                setUpdate(false);
                refreshPage;
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
