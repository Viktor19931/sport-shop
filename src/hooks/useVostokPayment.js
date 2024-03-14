import axios from 'axios';
import md5 from 'md5';

import { b64EncodeUnicode } from '../helpers/base64';

const PAYMENT = 'CC';
const SHOP_URL = 'https://elite-sport.netlify.app/shop/';
const KEY = process.env.GATSBY_VOSTOK_KEY;
const PASS = process.env.GATSBY_VOSTOK_PASS;

const useVostokPayment = () => {
  const handlePayVostok = async (name, email, amount, rate) => {
    console.log('AAA VOSTOK ');
  };

  return handlePayVostok;
};

export default useVostokPayment;
