import React, { useContext } from 'react';

import * as styles from './Shipping.module.css';
import { LocalizationContext } from '../../context/localizationContext';

const Shipping = (props) => {
  const { t } = useContext(LocalizationContext);
  return (
    <div className={styles.root}>
      <div className={styles.section}>
        <h4>{t('SHIPPING_PAGE.shippingTitle')}</h4>
        <p>{t('SHIPPING_PAGE.shippingDescription')}</p>
      </div>

      <div className={styles.section}>
        <h4>{t('SHIPPING_PAGE.returnTitle')}</h4>
        <p>{t('SHIPPING_PAGE.returnDescription')}</p>
      </div>
    </div>
  );
};

export default Shipping;
