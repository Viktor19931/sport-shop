import React, { useContext } from 'react';
import { navigate } from 'gatsby';
import * as styles from './ActionCard.module.css';

import Icon from '../Icons/Icon';
import { LocalizationContext } from '../../context/localizationContext';

const ActionCard = ({ title, icon, subtitle, link, size }) => {
  const { t } = useContext(LocalizationContext);

  return (
    <div
      className={styles.root}
      role={'presentation'}
      onClick={() => navigate(link)}
    >
      <div className={`${styles.iconContainer} ${styles[size]}`}>
        <Icon symbol={icon} />
      </div>
      <span className={styles.actionName}>{t(title)}</span>
      <span className={styles.link}>
        {t(subtitle)}
        <Icon symbol={'caret'} />
      </span>
    </div>
  );
};

export default ActionCard;
