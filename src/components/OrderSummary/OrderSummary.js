import React, { useState } from 'react';
import { Link, navigate } from 'gatsby';

import Button from '../Button';
import FormInputField from '../FormInputField/FormInputField';
import CurrencyFormatter from '../CurrencyFormatter';
import sendDataToBot from '../../helpers/sendDataToBot';

import * as styles from './OrderSummary.module.css';

import axios from 'axios';

const useMonoBankPayment = () => {
  const handlePayMono = async (name, amount) => {
    const monoData = await axios
      .post(
        'https://api.monobank.ua/api/merchant/invoice/create',
        {
          amount: amount * 100,
          ccy: 840,
          redirectUrl: 'https://amanita-store.com/orderConfirm',
          merchantPaymInfo: {
            customerEmails: [], // Масив пошт, на які потрібно відправити фіскальний чек, якщо у мерчанта активна звʼязка з checkbox
            destination: `Покупка речей, ${name}`,
            basketOrder: [
              // Склад замовлення, використовується для відображення кошика замовлення, обовʼязково вказувати при активній звʼязці з ПРРО (звʼязка створюється у веб-кабінеті https://web.monobank.ua або через портал check by mono https://www.monobank.ua/check)
              // {
              //   name: 'Табуретка',
              //   qty: 2,
              //   sum: 2100,
              //   // icon: 'string',
              //   // unit: 'шт.',
              //   // code: 'd21da1c47f3c45fca10a10c32518bdeb',
              //   // barcode: 'string',
              //   // header: 'string',
              //   // footer: 'string',
              //   tax: [],
              //   uktzed: 'string',
              //   discounts: [],
              // },
            ],
          },
        },
        {
          headers: {
            'X-Token': 'm5s0kEPoyNYzoqL1aDISeSw',
          },
        }
      )
      .catch((e) => console.log('MMM error', e));

    if (monoData) window.location.href = monoData.data.pageUrl;
    // window.open(monoData?.data.pageUrl);
  };

  return handlePayMono;
};

const isTest = () => window.location.search.includes('mode=test');

const OrderSummary = (props) => {
  const [coupon, setCoupon] = useState('');
  const [giftCard, setGiftCard] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handlePayMono = useMonoBankPayment();

  const handleBuy = () => {
    sendDataToBot(`
      магазин одягу

      name: ${name}
      email: ${email}
      phone: ${phone}
      address: ${address}

      coupon: ${coupon}
      giftCard: ${giftCard}

      price: ${props.totalPrice}$
    `);
    handlePayMono(name, isTest() ? 1 : props.totalPrice);
  };

  return (
    <div className={styles.root}>
      <div className={styles.orderSummary} style={{ marginBottom: 24 }}>
        <span className={styles.title}>Одержувач замовлення</span>
        <div className={styles.couponContainer}>
          <span>І'мя</span>
          <FormInputField
            id={'name'}
            value={name}
            handleChange={(_, t) => setName(t)}
          />
          <span>Повна адреса</span>
          <FormInputField
            id={'address'}
            value={address}
            handleChange={(_, t) => setAddress(t)}
          />
          <span>Телефон</span>
          <FormInputField
            id={'phone'}
            value={phone}
            handleChange={(_, t) => setPhone(t)}
          />
          <span>Поштова скринька</span>
          <FormInputField
            id={'email'}
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
          <span>
            <CurrencyFormatter amount={props.totalPrice} appendZero />
          </span>
        </div>
      </div>
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
