import React from "react";
import Stripe from "stripe";
import STRIPE_PUBLISHABLE from "../constants/Stripe";

const StripeComponent = () => {
  const stripe = new Stripe(STRIPE_PUBLISHABLE);

  (async () => {
    const customer = await stripe.customers.create({
      email: "customer@example.com",
    });

    
  })();
};

export default StripeComponent;
