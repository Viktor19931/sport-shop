import { Link } from 'gatsby';
import React, { useContext } from 'react';

import Brand from '../components/Brand';
import CartItem from '../components/CartItem';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Icon from '../components/Icons/Icon';
import OrderSummary from '../components/OrderSummary';

import * as styles from './cart.module.css';
import CartContext from '../context/cartContext';
import getParams from '../helpers/getParams';

const CartPage = ({ location }) => {
  const { mode } = getParams(location.search);
  const isTest = mode === 'test';
  const { items, totalPrice } = useContext(CartContext);

  return (
    <div>
      <div className={styles.contentContainer}>
        <Container size={'large'} spacing={'min'}>
          <div className={styles.headerContainer}>
            <div className={styles.shoppingContainer}>
              <Link className={styles.shopLink} to={'/shop'}>
                <Icon symbol={'arrow'}></Icon>
                <span className={styles.continueShopping}>
                  Продовжити покупки
                </span>
              </Link>
            </div>
            <Brand />
            <div className={styles.loginContainer}>
              {/* <Link to={'/login'}>Login</Link> */}
            </div>
          </div>
          <div className={styles.summaryContainer}>
            <h3>Мій кошик</h3>
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
      <Footer />
    </div>
  );
};

export default CartPage;
