import axios from 'axios';
import md5 from 'md5';

import { b64EncodeUnicode } from '../helpers/base64';

const useVostokPayment = () => {
  const handlePayVostok = async (name, email, amount, rate) => {
    const PAYMENT = 'CC';
    const SHOP_URL = 'https://elite-sport.netlify.app//shop/';
    const KEY = process.env.GATSBY_VOSTOK_KEY!;
    const PASS = process.env.GATSBY_VOSTOK_PASS!;

    let data;
    try {
      data = b64EncodeUnicode(
        JSON.stringify({
          amount: amount * rate, // 1000.00
          currency: 'UAH',
          destination: `Payment for goods from ${name} (${email}).`,
        })
      );
    } catch (error) {
      console.log('EEE data ', error);
    }

    let sign;

    try {
      sign = md5(
        KEY.split('').reverse().join('').toUpperCase() +
          PAYMENT.split('').reverse().join('').toUpperCase() +
          data.split('').reverse().join('').toUpperCase() +
          SHOP_URL.split('').reverse().join('').toUpperCase() +
          PASS.split('').reverse().join('').toUpperCase()
      );
    } catch (error) {
      console.log('EEE sign ', error);
    }

    console.log('AAA 1 ', {
      key: KEY,
      payment: PAYMENT,
      data,
      url: SHOP_URL,
      error_url: SHOP_URL,
      email,
      req_token: 'Y',
      sign,
    });

    const bankData = await axios.post(
      'https://secure.platononline.com/payment/auth',
      {
        key: KEY,
        payment: PAYMENT,
        data,
        url: SHOP_URL,
        error_url: SHOP_URL,
        email,
        req_token: 'Y',
        sign,
      }
    );

    if (bankData) console.log('DDD ', bankData);
  };

  return handlePayVostok;
};

export default useVostokPayment;
