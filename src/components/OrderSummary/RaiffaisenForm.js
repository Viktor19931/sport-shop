import forge from 'node-forge';
import React, { useEffect } from 'react';

// import { b64EncodeUnicode } from '../../helpers/base64';

const LOCALE = 'en';
const VERSION = '1';
const CURRENCY = '980'; // USD 840
const MERCHANT_ID = process.env.GATSBY_RAIFFEISEN_MERCHANT_ID;
const TERMINAL_ID = process.env.GATSBY_RAIFFEISEN_TERMINAL_ID;
const PRIVATE_KEY_PEM = process.env.GATSBY_RAIFFEISEN_PRIVATE_KEY;

const RaiffaisenPaymentForm = ({ name, email, amount, rate }) => {
  const NOW = Date.now();
  const ORDER_ID = `order-${NOW}`;

  const signData = `${MERCHANT_ID};${TERMINAL_ID};${NOW};${ORDER_ID};${CURRENCY};${amount};;`;

  let base64Signature = '';
  if (PRIVATE_KEY_PEM) {
    try {
      const privateKey = forge.pki.privateKeyFromPem(PRIVATE_KEY_PEM);
      const md = forge.md.sha256.create();
      md.update(signData);
      base64Signature = forge.util.encode64(privateKey.sign(md));
    } catch (e) {
      console.error('RaiffaisenForm: failed to sign payment data', e);
    }
  }

  useEffect(() => {
    document.getElementById('raiffeisen-total-amount').value = amount;
    document.getElementById('raiffeisen-total-sign').value = base64Signature;
  }, [signData]);

  return (
    <form
      id="RaiffaisenPaymentForm"
      method="POST"
      action="https://ecg.test.upc.ua/go/pay"
    >
      <input type="hidden" name="locale" value={LOCALE} />
      <input type="hidden" name="Version" value={VERSION} />
      <input type="hidden" name="OrderID" value={NOW} />
      <input type="hidden" name="Currency" value={CURRENCY} />
      <input type="hidden" name="MerchantID" value={MERCHANT_ID} />
      <input type="hidden" name="TerminalID" value={TERMINAL_ID} />
      <input type="hidden" name="PurchaseTime" value={NOW} />
      <input type="hidden" name="Signature" id="raiffeisen-total-sign" />
      <input type="hidden" name="TotalAmount" id="raiffeisen-total-amount" />
      <input
        type="hidden"
        name="PurchaseDesc"
        value={`Оплата за товар, ${name}`}
      />
    </form>
  );
};

export default RaiffaisenPaymentForm;
