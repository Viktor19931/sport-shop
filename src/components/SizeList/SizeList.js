import React, { useContext } from 'react';

import BoxOption from '../BoxOption';
import * as styles from './SizeList.module.css';
import { LocalizationContext } from '../../context/localizationContext';

const SizeList = (props) => {
  const { sizeList, setActiveSize, activeSize } = props;
  const { t } = useContext(LocalizationContext);

  return (
    <div className={styles.root}>
      <div className={styles.sizeLabelContainer}>
        <span className={styles.label}>{t('PRODUCT_PAGE.size')}</span>
      </div>
      <div className={styles.sizeSelection}>
        {sizeList?.map((sizeOption, index) => {
          return (
            <BoxOption
              key={index}
              data={sizeOption}
              setActive={setActiveSize}
              isActive={activeSize === sizeOption}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SizeList;
