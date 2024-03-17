import React, { useState } from 'react';
import { Link } from 'gatsby';

import Button from '../Button';
import FormInputField from '../FormInputField/FormInputField';
import CurrencyFormatter from '../CurrencyFormatter';
import sendDataToBot from '../../helpers/sendDataToBot';
import useBankPayment from '../../hooks/useBankPayment';

import PlatonForm from './PlatonForm';
import * as styles from './OrderSummary.module.css';

const isTest = () => window.location.search.includes('mode=test');

const OrderSummary = (props) => {
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

      price: ${props.totalPrice}$
    `);
    handlePay(name, isTest() ? 1 : props.totalPrice, email, 40);
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
            <CurrencyFormatter amount={props.totalPrice} appendZero /> / ₴
            {props.totalPrice * 40}
          </span>
        </div>
      </div>
      {process.env.GATSBY_PAYMENT_SYSTEM === 'PLATON' && (
        <PlatonForm
          {...{ name, email }}
          amount={props.totalPrice * 40}
          rate={1}
        />
      )}
      <div className={styles.actionContainer}>
        <Button onClick={handleBuy} fullWidth level={'primary'}>
          Купити
        </Button>
        <div className={styles.linkContainer}>
          <Link to={'/shop'}>Продовжити покупку</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
