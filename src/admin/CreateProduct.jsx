import React, {useState, useEffect} from 'react'
import {createProduct} from "../api-adapter/index"

 const CreateProduct =(props) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [inStock, setInStock] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");


async function handleSubmit(e) {
    e.preventDefault();
    const newProduct = await createProduct(name, description, inStock, price, image);

} 

//need to figure out how admin's access admin functionality
//useNavigate once figured out
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
          name="inStock"
          placeholder="How many are in stock?"
          value={inStock}
          onChange={(e) => setInStock(e.target.value)}
          label="Product InStock"
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
        <input
          type="text"
          name="image"
          placeholder="image url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          label="Product Image"
        />
        <button className="editproduct-button" type="submit">
          Create Product
        </button>
      </form>
      </div>
  )
}

export default CreateProduct