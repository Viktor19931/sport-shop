import axios from 'axios';

const useCryptoPayment = () => {
  const handlePayCrypto = async (name, email, amount) => {
    const data = await axios.post(
      'https://api.nowpayments.io/v1/invoice',
      {
        price_amount: amount,
        price_currency: 'usd',
        order_id: Date.now(),
        order_description: `Покупка речей`,
        success_url: `https://amanita-store.com/orderConfirm`,
        cancel_url: `https://amanita-store.com/404`,
      },
      {
        headers: {
          'x-api-key': 'A7Y6D7G-0X44S3B-PB0NK4W-3DSD38Q',
        },
      }
    );

    if (data) window.location.href = data.data.invoice_url;
  };

  return handlePayCrypto;
};

export default useCryptoPayment;
