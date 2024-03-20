import forge from 'node-forge';

const useVostokPayment = () => {
  const handlePayVostok = async (name, amount, email, rate) => {
    const amountToPay = (amount * rate).toFixed(2);
    const orderNumber = Date.now();
    const merchantId = process.env.GATSBY_VOSTOK_MERCHANT_ID;
    const authType = 1;
    const privateKeyPem = process.env.GATSBY_VOSTOK_PRIVATE_KEY;
    const privateKeyHash = process.env.GATSBY_VOSTOK_KEY_HASH;

    const data = `${orderNumber}|${amountToPay}|${merchantId}|${authType}`;

    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

    const md = forge.md.sha256.create();
    md.update(data, 'utf8');
    const signature = privateKey.sign(md);

    const base64Signature = forge.util.encode64(signature);

    const eComPay = new window.EcomSDK.CheckoutPay();

    eComPay.phoneNumber = '+380981234567';
    eComPay.amount = amountToPay;
    eComPay.description = 'Тестовий платіж';
    eComPay.partnerOrderId = orderNumber;
    eComPay.merchantId = merchantId;
    eComPay.authType = authType;
    eComPay.successRedirectUrl = `https://elite-sport.netlify.app/orderConfirm?name=${name}&amount=${amount}`;
    eComPay.failureRedirectUrl = 'https://elite-sport.netlify.app/404';
    eComPay.cultureName = 'uk-UA';
    eComPay.signature = base64Signature;
    eComPay.keyHash = privateKeyHash;
    eComPay.customParameters = {};

    eComPay.checkout();
  };

  return handlePayVostok;
};

export default useVostokPayment;
