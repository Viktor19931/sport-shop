import React, { useContext } from 'react';

import Swatch from '../Swatch';
import * as styles from './SwatchList.module.css';
import { LocalizationContext } from '../../context/localizationContext';

const SwatchList = (props) => {
  const { swatchList, activeSwatch, setActiveSwatch } = props;

  const { t } = useContext(LocalizationContext);
  return (
    <div className={styles.root}>
      <span className={styles.label}>
        {t('PRODUCT_PAGE.color')}: {activeSwatch.title}
      </span>
      <div className={styles.swatchSelection}>
        {swatchList?.map((colorChoice, index) => {
          return (
            <Swatch
              key={index}
              data={colorChoice}
              setActiveSwatch={setActiveSwatch}
              isActive={activeSwatch === colorChoice}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SwatchList;
