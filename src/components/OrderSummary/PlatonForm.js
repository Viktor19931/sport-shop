import React, { useEffect } from 'react';
import cryptoJs from 'crypto-js';

import { b64EncodeUnicode } from '../../helpers/base64';

const PAYMENT = 'CC';
const KEY = process.env.GATSBY_PLATON_KEY;
const PASS = process.env.GATSBY_PLATON_PASS;

const PaymentForm = ({ name, email, amount, rate }) => {
  const SHOP_URL = `https://elite-sport.netlify.app/shop/orderConfirm?name=${name}&amount=${amount}`;

  const data = b64EncodeUnicode(
    JSON.stringify({
      amount: (amount * rate).toFixed(2), // 1000.00
      currency: 'UAH',
      description: `Оплата за товар, ${name} .`,
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
    document.getElementById('data').value = data;
    document.getElementById('sign').value = sign;
  }, [data, sign]);

  return (
    <form
      id="PlatonPaymentForm"
      method="post"
      action="https://secure.platononline.com/payment/auth"
    >
      <input type="hidden" name="payment" value={PAYMENT} />
      <input type="hidden" name="key" value={KEY} />
      <input type="hidden" name="url" value={SHOP_URL} />
      <input type="hidden" name="data" id="data" />
      <input type="hidden" name="req_token" id="req_token" />
      <input type="hidden" name="sign" id="sign" />
    </form>
  );
};

export default PaymentForm;
