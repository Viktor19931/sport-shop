import { Link } from 'gatsby';
import React, { useContext } from 'react';
import * as styles from './Highlight.module.css';
import { LocalizationContext } from '../../context/LocalizationContext';

const Highlight = (props) => {
  const {
    image,
    altImage,
    miniImage,
    miniImageAlt,
    title,
    description,
    textLink,
    link,
  } = props;

  const { t } = useContext(LocalizationContext);

  return (
    <div className={styles.root}>
      <img alt={altImage} src={image} className={styles.highlightImage} />
      <div className={styles.contentContainer}>
        <h3>{t(title)}</h3>
        <p>{t(description)}</p>
        <Link to={link}>{t(textLink)}</Link>
        <img
          className={styles.miniImage}
          alt={miniImageAlt}
          src={miniImage}
        ></img>
      </div>
    </div>
  );
};

export default Highlight;
