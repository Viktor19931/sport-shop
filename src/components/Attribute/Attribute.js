import React, { useContext } from 'react';

import Icon from '../Icons/Icon';
import { LocalizationContext } from '../../context/LocalizationContext';

import * as styles from './Attribute.module.css';

const Attribute = (props) => {
  const { icon, title, subtitle } = props;

  const t = (k) => k;
  // const { t } = useContext(LocalizationContext);

  return (
    <div className={styles.root}>
      <div className={styles.iconContainer}>
        <Icon symbol={icon}></Icon>
      </div>
      <span className={styles.title}>{t(title)}</span>
      <span className={styles.subtitle}>{t(subtitle)}</span>
    </div>
  );
};

export default Attribute;
