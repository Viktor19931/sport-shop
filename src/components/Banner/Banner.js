import React, { useContext } from 'react';
import * as styles from './Banner.module.css';
import { LocalizationContext } from '../../context/localizationContext';

const Banner = (props) => {
  const {
    maxWidth,
    name,
    subtitle,
    color,
    bgImage,
    height,
    bgColor = 'var(--standard-light-grey)',
    hideSubtitleOnMobile = true,
  } = props;

  const { t } = useContext(LocalizationContext);

  const customStyling = {
    backgroundColor: bgColor,
    backgroundImage: bgImage !== undefined ? `url(${bgImage})` : 'none',
    height: height,
    color: color,
  };

  return (
    <div className={styles.root} style={customStyling}>
      <div className={styles.content} style={{ maxWidth: maxWidth }}>
        <h2>{t(name)}</h2>
        {subtitle && (
          <span
            className={`${styles.subtitle} ${
              hideSubtitleOnMobile === true ? styles.hideSubtitleOnMobile : ''
            }`}
          >
            {t(subtitle)}
          </span>
        )}
      </div>
    </div>
  );
};

export default Banner;
