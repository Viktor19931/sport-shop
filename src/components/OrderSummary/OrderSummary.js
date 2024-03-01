import React, { useState } from 'react';
import { Link, navigate } from 'gatsby';

import Button from '../Button';
import FormInputField from '../FormInputField/FormInputField';
import CurrencyFormatter from '../CurrencyFormatter';

import * as styles from './OrderSummary.module.css';

import axios from 'axios';

const useMonoBankPayment = () => {
  const handlePayMono = async (email: string, amount: number) => {
    const monoData = await axios
      .post(
        'https://api.monobank.ua/api/merchant/invoice/create',
        {
          amount: amount * 100,
          ccy: 840,
          redirectUrl: 'https://amanita-store.com/shop/',
          merchantPaymInfo: {
            customerEmails: [email], // Масив пошт, на які потрібно відправити фіскальний чек, якщо у мерчанта активна звʼязка з checkbox
            destination: 'Покупка речей',
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
            'X-Token': process.env.GATSBY_MONO_TOKEN,
          },
        }
      )
      .catch((e) => console.log('MMM error', e));

    if (monoData) window.location.href = monoData.data.pageUrl;
    // window.open(monoData?.data.pageUrl);
  };

  return handlePayMono;
};

const OrderSummary = (props) => {
  const [coupon, setCoupon] = useState('');
  const [giftCard, setGiftCard] = useState('');

  const handlePayMono = useMonoBankPayment();

  const handelPay = async () => {
    await handlePayMono();
    navigate('/orderConfirm');
  };

  return (
    <div className={styles.root}>
      <div className={styles.orderSummary}>
        <span className={styles.title}>order summary</span>
        <div className={styles.couponContainer}>
          <span>Coupon Code</span>
          <FormInputField
            value={coupon}
            handleChange={(_, coupon) => setCoupon(coupon)}
            id={'couponInput'}
            icon={'arrow'}
          />
          <span>Gift Card</span>
          <FormInputField
            value={giftCard}
            handleChange={(_, giftCard) => setGiftCard(giftCard)}
            id={'couponInput'}
            icon={'arrow'}
          />
        </div>
        <div className={styles.totalContainer}>
          <span>Total: </span>
          <span>
            <CurrencyFormatter amount={props.totalPrice} appendZero />
          </span>
        </div>
      </div>
      <div className={styles.actionContainer}>
        <Button onClick={handelPay} fullWidth level={'primary'}>
          checkout
        </Button>
        <div className={styles.linkContainer}>
          <Link to={'/shop'}>CONTINUE SHOPPING</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
