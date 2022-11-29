import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteProduct, getProductsById } from "../api-adapter/index";

const DeleteProducts = (props) => {
  const products = props.products;
  console.log(products, "happy");

  async function handleDelete(productId) {
    console.log(productId, "DELETE PRODUCTID");
    const adminProductId = Number(productId);
    const token = localStorage.getItem("token");

    const deleted = await deleteProduct(adminProductId, token);

    console.log(deleted, "here is deleted");
    // if (deleted.success) {
    //   navigate("/mycart/cart_items");
    // }
  }

  return (
    <div id="container">
      {products.length ? (
        products.map((product) => {
          return (
            <div key={product.id}>
              <button
              id={product.id ? `${product.id}` : null}
               onClick={() => handleDelete(product.id)}>
                {" "}
                Delete DELETEPRODUCT
              </button>
            </div>
          );
        })
      ) : (
        <div>Loading your products... </div>
      )}
    </div>
  );
};

export default DeleteProducts;
