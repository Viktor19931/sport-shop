import React, { useContext } from 'react';
import * as styles from './PublicOffer.module.css';
import { LocalizationContext } from '../../context/localizationContext';

const PublicOffer = (props) => {
  const { t } = useContext(LocalizationContext);
  return (
    <div className={styles.root}>
      <div className={styles.section}>
        <p dangerouslySetInnerHTML={{ __html: t('OFFER_PAGE.text') }} />
      </div>
    </div>
  );
};

export default PublicOffer;
