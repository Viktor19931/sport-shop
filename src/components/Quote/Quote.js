import React, { useContext } from 'react';
import * as styles from './Quote.module.css';
import { LocalizationContext } from '../../context/LocalizationContext';

const Quote = (props) => {
  const { bgColor, title, quote } = props;

  const { t } = useContext(LocalizationContext);
  return (
    <div className={styles.root} style={{ backgroundColor: bgColor }}>
      <span>{t(title)}</span>
      <p>{t(quote)}</p>
    </div>
  );
};

export default Quote;
