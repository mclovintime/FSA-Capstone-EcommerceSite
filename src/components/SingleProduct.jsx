import React, { useEffect, useState } from "react";
import { getProductsById, addProductToUserCart} from "../api-adapter";
import { useParams, useNavigate } from "react-router-dom";


const SingleProduct = (props) => {

  const { productId } = useParams();
  console.log(productId, "productID");
  const [product, setProduct] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    async function getSingleProduct() {
      let placeholder = await getProductsById(productId);
      console.log(placeholder.products, "placeholder");
      setProduct(placeholder.products);
    }
    getSingleProduct();
  }, []);



  const [quantity, setCount] = useState(0);
  let incrementCount = () => {
    setCount(quantity + 1);
  };
  
  let decrementCount = () => {
    setCount(quantity - 1);
  };

  function handleBack(){
    navigate("/products")
  }
  function handleBackToMyCart(){
    navigate("/mycart/cart_items")
  }
const addProduct = async (e)  => {
  e.preventDefault()
  const price = product.price
 
  const addedToCart = await addProductToUserCart(productId, price, quantity)
  console.log(addedToCart)
}

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
        
        <h1>{quantity}</h1>
      </div>
      <div class="buttons">
        <button title={"-"} action={decrementCount} />
        <button title={"+"} action={incrementCount} />
        
      </div>
    </div>
        <button onClick={addProduct}>Add to cart</button>
        <button onClick={handleBack}>Back To Products</button>
        <button onClick={handleBackToMyCart}>My Cart</button>

      </div>
    </div>
  ) : (
    <div>Loading your product... </div>
  );
};

export default SingleProduct;
