import { Link } from 'gatsby';
import React, { useContext } from 'react';
import * as styles from './Title.module.css';
import { LocalizationContext } from '../../context/LocalizationContext';

const Title = (props) => {
  const {
    name,
    subtitle,
    link,
    textLink,
    maxWidth,
    color = 'var(--standard-black)',
    hideSubtitleOnMobile = false,
    marginBottom = '32px',
  } = props;

  const { t } = useContext(LocalizationContext);

  return (
    <div
      className={`${styles.root} ${
        hideSubtitleOnMobile === true ? styles.hideSubtitleOnMobile : ''
      }`}
      style={{ maxWidth: maxWidth, marginBottom: marginBottom }}
    >
      <h2 className={styles.title} style={{ color: color }}>
        {t(name)}
      </h2>
      {subtitle && <span className={`${styles.subtitle}`}>{t(subtitle)}</span>}
      {link && textLink && (
        <Link className={styles.link} to={link}>
          {t(textLink)}
        </Link>
      )}
    </div>
  );
};

export default Title;
