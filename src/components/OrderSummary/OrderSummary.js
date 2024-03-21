import React, { useContext, useState } from 'react';
import { Link, Script } from 'gatsby';

import Button from '../Button';
import FormInputField from '../FormInputField/FormInputField';
import CurrencyFormatter from '../CurrencyFormatter';
import sendDataToBot from '../../helpers/sendDataToBot';
import useBankPayment from '../../hooks/useBankPayment';

import PlatonForm from './PlatonForm';
import * as styles from './OrderSummary.module.css';
import { LocalizationContext } from '../../context/localizationContext';

const OrderSummary = ({ isTest, totalPrice }) => {
  const [coupon, setCoupon] = useState('');
  const [giftCard, setGiftCard] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handlePay = useBankPayment();

  const handleBuy = async () => {
    await sendDataToBot(`
      магазин одягу

      name: ${name}
      email: ${email}
      phone: ${phone}
      address: ${address}

      coupon: ${coupon}
      giftCard: ${giftCard}

      price: ${totalPrice}$
      bank: ${process.env.GATSBY_PAYMENT_SYSTEM}
    `);
    await handlePay(name, isTest ? 1 : totalPrice, email, 40);
  };

  const { t } = useContext(LocalizationContext);

  return (
    <div className={styles.root}>
      <div className={styles.orderSummary} style={{ marginBottom: 24 }}>
        <span className={styles.title}>{t('CART_PAGE.form.title')}</span>
        <div className={styles.couponContainer}>
          <span>{t('CART_PAGE.form.name')}</span>
          <FormInputField
            id={'name'}
            required
            value={name}
            handleChange={(_, t) => setName(t)}
          />
          <span>{t('CART_PAGE.form.address')}</span>
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
          <span>{t('CART_PAGE.form.email')}</span>
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
            {totalPrice * 40}
          </span>
        </div>
      </div>
      {process.env.GATSBY_PAYMENT_SYSTEM === 'PLATON' && (
        <PlatonForm
          {...{ name, email }}
          amount={isTest ? 1 : totalPrice * 40}
          rate={1}
        />
      )}
      {process.env.GATSBY_PAYMENT_SYSTEM === 'VOSTOK' && (
        <Script
          async
          src="https://sdk.ecom.test.vostok.bank/SDK/Source/ecom.sdk.js"
        ></Script>
      )}
      <div className={styles.actionContainer}>
        <Button onClick={handleBuy} fullWidth level={'primary'}>
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
