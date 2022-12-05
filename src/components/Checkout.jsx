// import React, { useState } from "react";
// import axios from "axios";
// import "./Checkout.css";
// import StripeCheckout from "react-stripe-checkout";
// import { makePayment } from "../api-adapter";
// import STRIPE_PUBLISHABLE from "../constants/Stripe";

// const Checkout = (props) => {
//   const userCart = props.userCart;
//   const products = props.products;

//   console.log(userCart, "userCart");
//   console.log(products, "products");

//   const [product, setProduct] = useState({});

//   return (
//     <div>
//       {userCart && userCart.length
//         ? userCart.map((cartItem) => {
//             return (
//               <div key={`cartItem-${cartItem.id}`}>
//                 {products.length
//                   ? products.map((product) => {
//                       if (cartItem.productId === product.id) {
//                         return (
//                           <div
//                             key={`product-${product.id}`}
//                           >
//                             <StripeCheckout
//                               stripeKey={STRIPE_PUBLISHABLE}
//                               token={makePayment}
//                               name="Buy React"
//                               amount={product.price}
//                               className="wholeCheckout"
//                             >
//                               <button className="checkoutButton">
//                                 Checkout Your Cart
//                               </button>
//                             </StripeCheckout>
//                           </div>
//                         );
//                       }
//                     })
//                   : null}
//               </div>
//             );
//           })
//         : null}
//     </div>
//   );
// };

// import STRIPE_PUBLISHABLE from '../constants/Stripe';
// import PAYMENT_SERVER_URL from '../constants/Server';

// const CURRENCY = 'USD';

// const fromDollarToCent = amount => amount * 100;

// const successPayment = data => {
//   alert('Payment Successful');
// };

// const errorPayment = data => {
//   alert('Payment Error');
// };

// const onToken = (amount, description) => token =>
//   axios.post(PAYMENT_SERVER_URL,
//     {
//       description,
//       source: token.id,
//       currency: CURRENCY,
//       amount: fromDollarToCent(amount)
//     })
//     .then(successPayment)
//     .catch(errorPayment);

// const Checkout = ({ name, description, amount }) =>
//   <StripeCheckout
//     name={name}
//     description={description}
//     amount={fromDollarToCent(amount)}
//     token={onToken(amount, description)}
//     currency={CURRENCY}
//     stripeKey={STRIPE_PUBLISHABLE}
//   />

// export default Checkout;
