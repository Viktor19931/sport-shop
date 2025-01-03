import { navigate } from 'gatsby';
import React, { useContext, useState } from 'react';

import Drawer from '../Drawer';
import QuickView from '../QuickView';
import AdjustItem from '../AdjustItem';
import RemoveItem from '../RemoveItem';
import * as styles from './CartItem.module.css';
import CartContext from '../../context/cartContext';
import { USD_RATE } from '../../constants';
import { LocalizationContext } from '../../context/localizationContext';

const CartItem = (props) => {
  const { setItem, deleteItems } = useContext(CartContext);
  const [showQuickView, setShowQuickView] = useState(false);
  const { gallery, alt, name, price } = props;

  const { t } = useContext(LocalizationContext);

  return (
    <div className={styles.root}>
      <div
        className={styles.imageContainer}
        role={'presentation'}
        onClick={() => navigate('/product')}
      >
        <img src={gallery?.[0]} alt={alt} />
      </div>
      <div className={styles.itemContainer}>
        <span className={styles.name}>{t(name)}</span>
      </div>
      <div className={styles.adjustItemContainer}>
        <AdjustItem
          qty={props.quantity}
          setQty={(gty) => setItem({ ...props, quantity: gty })}
        />
      </div>
      <div className={styles.priceContainer}>
        {price}$ / ₴{price * USD_RATE}
      </div>
      <div className={styles.removeContainer}>
        <RemoveItem onRemove={() => deleteItems(props.id)} />
      </div>
      <Drawer visible={showQuickView} close={() => setShowQuickView(false)}>
        <QuickView close={() => setShowQuickView(false)} />
      </Drawer>
    </div>
  );
};

export default CartItem;
