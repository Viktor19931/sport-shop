import React, { useContext } from 'react';

import Icon from '../Icons/Icon';
import * as styles from './Attribute.module.css';
import { LocalizationContext } from '../../context/LocalizationContext';

const Attribute = (props) => {
  const { icon, title, subtitle } = props;

  const { t } = useContext(LocalizationContext);

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
