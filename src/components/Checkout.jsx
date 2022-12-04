import React, { useState } from 'react'
import axios from 'axios';
import "./Checkout.css"
import StripeCheckout from 'react-stripe-checkout';
import { makePayment } from '../api-adapter';


const Checkout = () => {

const [product, setProduct] = useState({
  name: 'React from FB',
  price: 10,
  productBy: 'facebook'
})
console.log(process.env.REACT_APP_KEY)


return (
  <StripeCheckout
  stripeKey= {process.env.REACT_APP_KEY}
  token={makePayment}
  name= 'Buy React'
  amount={product.price *100}
  className='wholeCheckout'
  >
    <button className="checkoutButton">Checkout Your Cart</button>
  </StripeCheckout>
)

}


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

export default Checkout;