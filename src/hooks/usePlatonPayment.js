import axios from 'axios';
import md5 from 'md5';

import { b64EncodeUnicode } from '../helpers/base64';

const PAYMENT = 'CC';
const SHOP_URL = 'https://elite-sport.netlify.app/shop/';
const KEY = process.env.GATSBY_PLATON_KEY!;
const PASS = process.env.GATSBY_PLATON_PASS!;

const usePlatonPayment = () => {
  console.log('AAA Platon ');
  
  const handlePayVostok = async () => {
    // const data = b64EncodeUnicode(
    //   JSON.stringify({
    //     amount: amount * rate, // 1000.00
    //     currency: 'UAH',
    //     destination: `Payment for goods from ${name} (${email}).`,
    //   })
    // );

    // const sign = md5(
    //   KEY.split('').reverse().join('').toUpperCase() +
    //     PAYMENT.split('').reverse().join('').toUpperCase() +
    //     data.split('').reverse().join('').toUpperCase() +
    //     SHOP_URL.split('').reverse().join('').toUpperCase() +
    //     PASS.split('').reverse().join('').toUpperCase()
    // );

   const form =  (document.getElementById("paymentForm")) as HTMLFormElement
   form.submit()
  };

  return handlePayVostok;
};

export default usePlatonPayment;
