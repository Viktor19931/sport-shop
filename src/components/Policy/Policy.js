import React, { useContext } from 'react';
import * as styles from './Policy.module.css';
import { LocalizationContext } from '../../context/localizationContext';

const Policy = (props) => {
  const { t } = useContext(LocalizationContext);
  return (
    <div className={styles.root}>
      <div className={styles.section}>
        <p dangerouslySetInnerHTML={{ __html: t('POLICY_PAGE.text') }} />
      </div>
    </div>
  );
};

export default Policy;
