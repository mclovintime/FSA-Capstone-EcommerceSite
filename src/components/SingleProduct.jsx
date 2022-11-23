import React, { useEffect, useState } from "react";
import { getProductsById } from "../api-adapter";
import { useParams } from "react-router-dom";

const SingleProduct = (props) => {

  const { productId } = useParams();
  console.log(productId, "productID");
  const [product, setProduct] = useState("");

  useEffect(() => {
    async function getSingleProduct() {
      let placeholder = await getProductsById(productId);
      console.log(placeholder.products, "placeholder");
      setProduct(placeholder.products);
    }
    getSingleProduct();
  }, []);

  const [count, setCount] = useState(0);
  let incrementCount = () => {
    setCount(count + 1);
  };
  
  let decrementCount = () => {
    setCount(count - 1);
  };

  return product ? (
    <div>
      <div key={`product-${product.id}`} className="productBox">
        <div className="productName">{product.name}</div>
        <div className="productDescription">
          Description: {product.description}
        </div>
        <div className="productDescription">
          {` testing product id ${product.id}`}
        </div>

        <div className="productInStock">In stock: {product.stock}</div>
        <div className="productID">Price: {product.price}</div>
        <img id="productImage" src={`${product.image_url}`} />
        <div>
      <div class="count">
        
        <h1>{count}</h1>
      </div>
      <div class="buttons">
        <button title={"-"} action={decrementCount} />
        <button title={"+"} action={incrementCount} />
      </div>
    </div>
        <button>Add to cart</button>

      </div>
    </div>
  ) : (
    <div>Loading your product... </div>
  );
};

export default SingleProduct;
