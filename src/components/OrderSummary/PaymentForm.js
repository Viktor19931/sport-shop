import md5 from 'md5';
import React, { useEffect } from 'react';
import cryptoJs from 'crypto-js';

const PAYMENT = 'CC';
const SHOP_URL = 'https://elite-sport.netlify.app/shop/';
const KEY = process.env.GATSBY_PLATON_KEY;
const PASS = process.env.GATSBY_PLATON_PASS;

// var data = btoa(JSON.stringify({
// 	'amount': '100.00',
// 	'description': 'Test',
// 	'currency': 'UAH'
// }));
// var req_token = 'Y';
// var url = 'http://google.com';

// var sign = CryptoJS.MD5(
// 	key.split('').reverse().join('').toUpperCase() +
// 	payment.split('').reverse().join('').toUpperCase() +
// 	data.split('').reverse().join('').toUpperCase() +
// 	url.split('').reverse().join('').toUpperCase() +
// 	pass.split('').reverse().join('').toUpperCase()
// ).toString();

const PaymentForm = ({ name, email, amount, rate }) => {
  const data = btoa(
    JSON.stringify({
      amount: (amount * rate).toFixed(2), // 1000.00
      currency: 'UAH',
      destination: `Payment for goods from ${name} (${email}).`,
    })
  );

  const sign = cryptoJs.MD5(
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
    document.getElementById('req_token').value = 'Y';
    document.getElementById('sign').value = sign;
  }, []);

  if (process.env.GATSBY_PAYMENT_SYSTEM !== 'PLATON') return;

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
