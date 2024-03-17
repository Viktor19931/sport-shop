import axios from 'axios';
import sha256 from 'crypto-js/sha256';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';

const useVostokPayment = () => {
  const handlePayVostok = async (name, amount, email, rate) => {
    const amountToPay = (amount * rate).toFixed(2);
    const orderNumber = Date.now();
    const merchantId = process.env.GATSBY_VOSTOK_MERCHANT_ID;
    const authType = 1;
    const key = process.env.GATSBY_VOSTOK_PRIVATE_KEY;

    const paymentString = `${orderNumber}|${amountToPay}|${merchantId}|${authType}`;
    const paymentByteString = new TextEncoder().encode(paymentString);

    const hashPrivateKeyHSA256 = sha256(key);

    const signature = Base64.stringify(hmacSHA256(paymentByteString, key));

    console.log(
      'AAA VOSTOK ',
      name,
      amount,
      rate,
      signature,
      key,
      process.env.GATSBY_VOSTOK_PUBLIC_KEY
    );

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
