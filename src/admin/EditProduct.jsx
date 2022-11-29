import React, {useState, useEffect} from 'react'
import {updateProduct} from "../api-adapter/index"

 const EditProduct =(props) => {
  const product = props.product
  console.log(product)
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newStock, setNewStock] = useState("");
  const [newImage_URL, setNewImage_URL] = useState("");
  const [newPrice, setNewPrice] = useState("");
  
async function handleSubmit(e) {
    e.preventDefault();
    await update   
} 



async function handleSubmit(e) {
  e.preventDefault();
  const toUpdate = e.target.id;
  const token = localStorage.getItem("token");
  const updated = await editRoutine(toUpdate, token, {
    name: newName,
    goal: newGoal,
    isPublic: isPublic,
  },
);
}
  return (
    <div>EditProduct</div>
  )
}

export default EditProduct
