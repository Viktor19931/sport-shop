import forge from 'node-forge';
import CryptoJS from 'crypto-js';

const ORDER_NUMBER = Date.now();
const MERCHANT_id = process.env.GATSBY_VOSTOK_MERCHANT_ID;
const AUTH_TYPE = 1;
const PRIVATE_KEY_PEM = process.env.GATSBY_VOSTOK_PRIVATE_KEY;

const useVostokPayment = () => {
  const handlePayVostok = async (name, email, amount, rate) => {
    const amountToPay = (amount * rate).toFixed(2);

    const privateKeyHash = CryptoJS.SHA256().toString(CryptoJS.enc.Hex);

    const data = `${ORDER_NUMBER}|${amountToPay}|${MERCHANT_id}|${AUTH_TYPE}`;

    const privateKey = forge.pki.privateKeyFromPem(PRIVATE_KEY_PEM);

    const md = forge.md.sha256.create();
    md.update(data, 'utf8');
    const signature = privateKey.sign(md);

    const base64Signature = forge.util.encode64(signature);

    const eComPay = new window.EcomSDK.CheckoutPay();

    eComPay.phoneNumber = '+380981234567';
    eComPay.amount = amountToPay;
    eComPay.description = `Покупка речей, ${name}`;
    eComPay.partnerOrderId = ORDER_NUMBER;
    eComPay.merchantId = MERCHANT_id;
    eComPay.authType = AUTH_TYPE;
    eComPay.successRedirectUrl = `https://elite-sport.netlify.app/orderConfirm?name=${name}&amount=${amount}`;
    eComPay.failureRedirectUrl = 'https://elite-sport.netlify.app/404';
    eComPay.cultureName = 'en';
    eComPay.signature = base64Signature;
    eComPay.keyHash = privateKeyHash;
    eComPay.customParameters = {};

    eComPay.checkout();
  };

  return handlePayVostok;
};

export default useVostokPayment;
