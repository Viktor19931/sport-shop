import { Link, Script } from 'gatsby';
import React, { useContext, useState } from 'react';

import Button from '../Button';
import { USD_RATE } from '../../constants';
import sendDataToBot from '../../helpers/sendDataToBot';
import useBankPayment from '../../hooks/useBankPayment';
import FormInputField from '../FormInputField/FormInputField';
import RaiffaisenForm from './RaiffaisenForm';
import { CartContext } from '../../context/cartContext';
import CurrencyFormatter from '../CurrencyFormatter';
import { LocalizationContext } from '../../context/localizationContext';

import PlatonForm from './PlatonForm';
import * as styles from './OrderSummary.module.css';

const OrderSummary = ({ isTest, totalPrice }) => {
  const { t } = useContext(LocalizationContext);
  const { items } = useContext(CartContext);

  const [coupon, setCoupon] = useState('');
  const [giftCard, setGiftCard] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [isSubmitted, setSubmitted] = useState(false);

  const handlePay = useBankPayment();

  const isValid = !!name && !!email && !!address;
  const productString = items.reduce((acc, item) => {
    const { name, size, color, price } = item;
    const row = `${t(name)}-${size}-${color.color}-${price}$`;

    return `${acc}
            ${row}`;
  }, '');

  const handleBuy = async () => {
    setSubmitted(true);

    if (!isValid) return;

    await sendDataToBot(`
      магазин одягу

      name: ${name}
      email: ${email}
      phone: ${phone}
      address: ${address}

      products: ${productString}

      coupon: ${coupon}
      giftCard: ${giftCard}

      price: ${totalPrice}$
      bank: ${process.env.GATSBY_PAYMENT_SYSTEM}
    `);

    await handlePay(name, email, isTest ? 1 : totalPrice, USD_RATE);
  };

  return (
    <div className={styles.root}>
      <div className={styles.orderSummary} style={{ marginBottom: 24 }}>
        <span className={styles.title}>{t('CART_PAGE.form.title')}</span>
        <div className={styles.couponContainer}>
          <span>{t('CART_PAGE.form.name')} *</span>
          <FormInputField
            id={'name'}
            required
            value={name}
            handleChange={(_, t) => setName(t)}
          />
          <span>{t('CART_PAGE.form.address')} *</span>
          <FormInputField
            id={'address'}
            required
            value={address}
            handleChange={(_, t) => setAddress(t)}
          />
          <span>{t('CART_PAGE.form.phone')}</span>
          <FormInputField
            id={'phone'}
            required
            value={phone}
            handleChange={(_, t) => setPhone(t)}
          />
          <span>{t('CART_PAGE.form.email')} *</span>
          <FormInputField
            id={'email'}
            required
            value={email}
            handleChange={(_, t) => setEmail(t)}
          />
        </div>
      </div>
      <div className={styles.orderSummary}>
        <div className={styles.couponContainer}>
          <span>{t('CART_PAGE.form.coupon')}</span>
          <FormInputField
            value={coupon}
            handleChange={(_, coupon) => setCoupon(coupon)}
            id={'couponInput'}
            icon={'arrow'}
          />
          <span>{t('CART_PAGE.form.certificate')}</span>
          <FormInputField
            value={giftCard}
            handleChange={(_, giftCard) => setGiftCard(giftCard)}
            id={'couponInput'}
            icon={'arrow'}
          />
        </div>
        <div className={styles.totalContainer}>
          <span>{t('CART_PAGE.total')} </span>
          <span style={{ fontSize: 24 }}>
            <CurrencyFormatter amount={totalPrice} appendZero /> / ₴
            {totalPrice * USD_RATE}
          </span>
        </div>
      </div>
      {process.env.GATSBY_PAYMENT_SYSTEM === 'PLATON' && (
        <PlatonForm
          {...{ name, email }}
          amount={isTest ? 1 : totalPrice * USD_RATE}
          rate={1}
        />
      )}
      {process.env.GATSBY_PAYMENT_SYSTEM === 'RAIFFEISEN' && (
        <RaiffaisenForm
          {...{ name, email }}
          amount={isTest ? 1 : totalPrice * USD_RATE}
          rate={1}
        />
      )}
      {process.env.GATSBY_PAYMENT_SYSTEM === 'VOSTOK' && (
        <Script
          async
          src="https://sdk.ecom.vostok.bank/SDK/Source/ecom.sdk.js"
        />
      )}
      {isSubmitted && !isValid && (
        <p className={styles.errorText}>{t('CART_PAGE.form.error')}</p>
      )}
      <div className={styles.actionContainer}>
        <Button
          className={isValid ? '' : styles.disabledButton}
          onClick={handleBuy}
          fullWidth
          level={'primary'}
        >
          {t('CART_PAGE.form.button')}
        </Button>
        <div className={styles.linkContainer}>
          <Link to={'/shop'}>{t('CART_PAGE.goToShop')}</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
