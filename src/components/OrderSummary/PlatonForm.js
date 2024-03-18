import React, { useEffect } from 'react';
import CryptoJS from 'crypto-js';

const PAYMENT = 'CC';
const KEY = process.env.GATSBY_PLATON_KEY;
const PASS = process.env.GATSBY_PLATON_PASS;

const PaymentForm = ({ name, email, amount, rate }) => {
  const SHOP_URL = `https://elite-sport.netlify.app/shop/orderConfirm?name=${name}&amount=${amount}`;

  const data = CryptoJS.enc.Base64.stringify(
    JSON.stringify({
      amount: (amount * rate).toFixed(2), // 1000.00
      currency: 'UAH',
      description: `Покупка речей, ${name} .`,
    })
  );

  const sign = CryptoJS.MD5(
    KEY.split('').reverse().join('').toUpperCase() +
      PAYMENT.split('').reverse().join('').toUpperCase() +
      data.split('').reverse().join('').toUpperCase() +
      SHOP_URL.split('').reverse().join('').toUpperCase() +
      PASS.split('').reverse().join('').toUpperCase()
  );

  useEffect(() => {
    document.getElementById('payment').value = PAYMENT;
    document.getElementById('key').value = KEY;
    document.getElementById('url').value = SHOP_URL;
    document.getElementById('data').value = data;
    // document.getElementById('req_token').value = 'Y';
    document.getElementById('sign').value = sign;
  }, [name, email, amount, rate]);

  return (
    <form
      id="paymentForm"
      method="post"
      action="https://secure.platononline.com/payment/auth"
    >
      <input type="hidden" name="payment" id="payment" />
      <input type="hidden" name="key" id="key" />
      <input type="hidden" name="url" id="url" />
      <input type="hidden" name="data" id="data" />
      <input type="hidden" name="req_token" id="req_token" />
      <input type="hidden" name="sign" id="sign" />
    </form>
  );
};

export default PaymentForm;
