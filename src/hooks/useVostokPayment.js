import axios from 'axios';
import CryptoJs from 'crypto-js';

const useVostokPayment = () => {
  const handlePayVostok = async (name, amount, email, rate) => {
    const amountToPay = (amount * rate).toFixed(2);
    const orderNumber = Date.now();
    const merchantId = process.env.GATSBY_VOSTOK_MERCHANT_ID;
    const authType = 1;
    const key = process.env.GATSBY_VOSTOK_PRIVATE_KEY;

    const hashPrivateKeyHSA256 = CryptoJs.sha256(key).toString(
      CryptoJs.enc.Hex
    );

    const paymentString = `${orderNumber}|${amountToPay}|${merchantId}|${authType}`;
    // const utf8Bytes = new TextEncoder().encode(paymentString);
    const signature = CryptoJs.hmacSHA256(paymentString, key).toString(
      CryptoJS.enc.Base64
    );

    console.log('AAA VOSTOK ');

    if (!0) return;

    const data = await axios.post(
      'https://api.ecom.test.vostok.bank',
      {
        amount: amountToPay,
        partnerOrderId: orderNumber,
        merchantId: merchantId,
        authType: authType,
        // 1 - Authorization
        // 2 - PreAuthorization
        // 4 - Verify
        currency: 'UAH',
        signature: 'signature',
        keyHash: 'keyHash',
        description: `Покупка речей, ${name}`,
        cultureName: 'en', // uk-UA (default)
        successRedirectUrl: `https://elite-sport.netlify.app/orderConfirm?name=${name}&amount=${amount}`,
        failureRedirectUrl: 'https://elite-sport.netlify.app/404',
        deepLinkUrl: null,
      },
      {
        headers: {
          'X-Key': hashPrivateKeyHSA256, // 'SHA256HASH(private_key)'
          'X-Signature': signature, // 'BASE64(RSA_SIGN(private_key, data, sha256 digest))',
        },
      }
    );

    console.log(data);
  };

  return handlePayVostok;
};

export default useVostokPayment;
