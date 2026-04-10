// Bloom & Charm — payment handler
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const { amount, currency, metadata } = JSON.parse(event.body);

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    metadata,
    receipt_email: metadata.email,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ clientSecret: paymentIntent.client_secret })
  };
};