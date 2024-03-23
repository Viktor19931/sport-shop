import forge from 'node-forge';
import React, { useEffect } from 'react';

// import { b64EncodeUnicode } from '../../helpers/base64';

const CURRENCY = '840'; // USD
const LOCALE = 'uk'; // en
const MERCHANT_ID = process.env.GATSBY_RAIFFEISEN_MERCHANT_ID;
const TERMINAL_ID = process.env.GATSBY_RAIFFEISEN_TERMINAL_ID;
const PRIVATE_KEY_PEM = process.env.GATSBY_RAIFFEISEN_PRIVATE_KEY;

const RaiffaisenPaymentForm = ({ name, email, amount, rate }) => {
  const NOW = Date.now();
  // const SHOP_URL = `https://elite-sport.netlify.app/shop/orderConfirm?name=${name}&amount=${amount}`;

  const signData = `${MERCHANT_ID};${TERMINAL_ID};${NOW};${NOW};${CURRENCY};${amount};;`;

  const privateKey = forge.pki.privateKeyFromPem(PRIVATE_KEY_PEM);

  const md = forge.md.sha256.create();
  md.update(signData, 'utf8');
  const signature = privateKey.sign(md);

  const base64Signature = forge.util.encode64(signature);

  useEffect(() => {
    document.getElementById('raiffeisen-merchant-id').value = MERCHANT_ID;
    document.getElementById('raiffeisen-terminal-id').value = TERMINAL_ID;
    document.getElementById('raiffeisen-total-amount').value = amount;
    document.getElementById('raiffeisen-total-amount').value = NOW;
    document.getElementById('raiffeisen-total-sign').value = base64Signature;
  }, [signData]);

  return (
    <form
      method="POST"
      action="https://ecg.test.upc.ua/go/pay"
      id="RaiffaisenPaymentForm"
    >
      <input type="hidden" name="Version" value="1" />
      <input type="hidden" name="MerchantID" id="raiffeisen-merchant-id" />
      <input type="hidden" name="TerminalID" id="raiffeisen-terminal-id" />
      <input type="hidden" name="TotalAmount" id="raiffeisen-total-amount" />
      <input type="hidden" name="Currency" value={CURRENCY} />
      <input type="hidden" name="locale" value={LOCALE} />
      <input type="hidden" name="PurchaseTime" value={NOW} />
      <input type="hidden" name="OrderID" value={NOW} />
      <input type="hidden" name="Signature" id="raiffeisen-total-sign" />
    </form>
  );
};

export default RaiffaisenPaymentForm;
