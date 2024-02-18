import React, { useState, useContext } from 'react';

import Button from '../Button';
import CurrencyFormatter from '../CurrencyFormatter';
import SizeList from '../SizeList';
import SwatchList from '../SwatchList';

import { generateMockProductData } from '../../helpers/mock';
import AddItemNotificationContext from '../../context/cartContext';

import * as styles from './QuickView.module.css';

const QuickView = (props) => {
  const { close, buttonTitle = 'Add to Bag' } = props;

  const ctxAddItemNotification = useContext(AddItemNotificationContext);
  const showNotification = ctxAddItemNotification.showNotification;
  const [activeSwatch, setActiveSwatch] = useState();
  const [activeSize, setActiveSize] = useState();

  const handleAddToBag = () => {
    close();
    showNotification();
  };

  return (
    <div className={styles.root}>
      <div className={styles.titleContainer}>
        <h4>Select Options</h4>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.productContainer}>
          <div className={styles.price}></div>
          <div className={styles.productImageContainer}></div>
        </div>

        <div className={styles.sectionContainer}></div>

        <div className={styles.sectionContainer}></div>

        <Button onClick={() => handleAddToBag()} fullWidth level={'primary'}>
          {buttonTitle}
        </Button>
      </div>
    </div>
  );
};

export default QuickView;
