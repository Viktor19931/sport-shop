import React, { useContext } from 'react';

import CartItem from '../components/CartItem';
import Container from '../components/Container';
import OrderSummary from '../components/OrderSummary';

import * as styles from './cart.module.css';
import CartContext from '../context/cartContext';
import getParams from '../helpers/getParams';
import { LocalizationContext } from '../context/localizationContext';

const CartPage = ({ location }) => {
  const { mode } = getParams(location.search);
  const isTest = mode === 'test';
  const { items, totalPrice } = useContext(CartContext);
  const { t } = useContext(LocalizationContext);

  return (
    <div>
      <div className={styles.contentContainer}>
        <Container size={'large'} spacing={'min'}>
          <div className={styles.summaryContainer}>
            <h3>{t('CART_PAGE.title')}</h3>
            <div className={styles.cartContainer}>
              <div className={styles.cartItemsContainer}>
                {items.map((item) => (
                  <CartItem key={item.id} {...item} />
                ))}
              </div>
              <OrderSummary isTest={isTest} totalPrice={totalPrice} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default CartPage;
