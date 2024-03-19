import React, { useState } from 'react';
import { Link, Script } from 'gatsby';

import Button from '../Button';
import FormInputField from '../FormInputField/FormInputField';
import CurrencyFormatter from '../CurrencyFormatter';
import sendDataToBot from '../../helpers/sendDataToBot';
import useBankPayment from '../../hooks/useBankPayment';

import PlatonForm from './PlatonForm';
import * as styles from './OrderSummary.module.css';
import { Helmet } from 'react-helmet';

const OrderSummary = ({ isTest, totalPrice }) => {
  const [coupon, setCoupon] = useState('');
  const [giftCard, setGiftCard] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handlePay = useBankPayment();

  const handleBuy = async () => {
    setIsLoading(true);
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

    setIsLoading(false);
  };

  return (
    <div className={styles.root}>
      <div className={styles.orderSummary} style={{ marginBottom: 24 }}>
        <span className={styles.title}>Одержувач замовлення</span>
        <div className={styles.couponContainer}>
          <span>І'мя</span>
          <FormInputField
            id={'name'}
            required
            value={name}
            handleChange={(_, t) => setName(t)}
          />
          <span>Повна адреса</span>
          <FormInputField
            id={'address'}
            required
            value={address}
            handleChange={(_, t) => setAddress(t)}
          />
          <span>Телефон</span>
          <FormInputField
            id={'phone'}
            required
            value={phone}
            handleChange={(_, t) => setPhone(t)}
          />
          <span>Поштова скринька</span>
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
          <span>Купон</span>
          <FormInputField
            value={coupon}
            handleChange={(_, coupon) => setCoupon(coupon)}
            id={'couponInput'}
            icon={'arrow'}
          />
          <span>Подарунковий сертифікат</span>
          <FormInputField
            value={giftCard}
            handleChange={(_, giftCard) => setGiftCard(giftCard)}
            id={'couponInput'}
            icon={'arrow'}
          />
        </div>
        <div className={styles.totalContainer}>
          <span>Сума: </span>
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
          {isLoading ? '...Оплата' : 'Купити'}
        </Button>
        <div className={styles.linkContainer}>
          <Link to={'/shop'}>Продовжити покупку</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
