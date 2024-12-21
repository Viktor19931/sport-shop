import React, { useContext, useState } from 'react';
import { navigate } from 'gatsby';

import Icon from '../Icons/Icon';
import { USD_RATE } from '../../constants';
import { LocalizationContext } from '../../context/localizationContext';

import * as styles from './ProductCard.module.css';

const ProductCard = (props) => {
  const [isWishlist, setIsWishlist] = useState(false);
  const {
    id,
    imageAlt,
    name,
    price,
    gallery,
    originalPrice,
    meta,
    height = 580,
  } = props;

  const handleRouteToProduct = () => {
    navigate(`/product?id=${id}`);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    // showQuickView();
    navigate(`/product?id=${id}`);
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsWishlist(!isWishlist);
  };

  const { t } = useContext(LocalizationContext);

  return (
    <div className={styles.root}>
      <div
        className={styles.imageContainer}
        onClick={() => handleRouteToProduct()}
        role={'presentation'}
      >
        <img
          style={{ height: `${height}px` }}
          src={gallery[0]}
          alt={imageAlt}
        ></img>
        <div
          className={styles.bagContainer}
          role={'presentation'}
          onClick={(e) => handleQuickView(e)}
        >
          <Icon symbol={'bagPlus'} />
        </div>
        <div
          className={styles.heartContainer}
          role={'presentation'}
          onClick={(e) => handleFavorite(e)}
        >
          <Icon symbol={'heart'} />
          <div
            className={`${styles.heartFillContainer} ${
              isWishlist === true ? styles.show : styles.hide
            }`}
          >
            <Icon symbol={'heartFill'}></Icon>
          </div>
        </div>
      </div>
      <div className={styles.detailsContainer}>
        <span className={styles.productName}>{t(name)}</span>
        <div className={styles.prices}>
          <span
            className={`${originalPrice !== undefined ? styles.salePrice : ''}`}
          >
            ${price} / ₴{price * USD_RATE}
          </span>
          {originalPrice && (
            <span className={styles.originalPrice}>${originalPrice}</span>
          )}
        </div>
        <span className={styles.meta}>{meta}</span>
      </div>
    </div>
  );
};

export default ProductCard;
