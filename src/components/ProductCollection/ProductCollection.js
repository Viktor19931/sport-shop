import { navigate } from 'gatsby';
import React, { useContext } from 'react';

import { LocalizationContext } from '../../context/localizationContext';

import * as styles from './ProductCollection.module.css';

const ProductCollection = (props) => {
  const { image, title, text, link } = props;

  const { t } = useContext(LocalizationContext);

  return (
    <div
      role={'presentation'}
      onClick={() => navigate(link)}
      className={styles.root}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={styles.content}>
        <span className={styles.title}>{t(title)}</span>
        <span className={styles.text}>{t(text)}</span>
      </div>
      <div className={styles.overlay}></div>
    </div>
  );
};

export default ProductCollection;
