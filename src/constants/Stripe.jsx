const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'sk_test_51M6yNAChZbepu0tegirpoYXAh8qTu81xCEJQJuKVPkuHeSAVBH0NWxx0juJZNuFNdAtNYTl8QRTgyThIh1ABqwUt00IWs0OqDY'
  : 'pk_test_51M6yNAChZbepu0teU0TYJC8vE6MTAyXu7VAaCMYndlFPi6Fv1sYhkG8UnHNoIOKQadMZTy9B7qTM6GO3e21dEhPs00mwOEgotQ';

export default STRIPE_PUBLISHABLE;