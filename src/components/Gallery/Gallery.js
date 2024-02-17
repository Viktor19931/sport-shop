import React from 'react';

import Slider from '../Slider';

import * as styles from './Gallery.module.css';

const Gallery = (props) => {
  const { images } = props;

  const customSliderSettings = {
    slidesToShow: 1,
  };

  const renderImages = () => {
    return images?.map((img, index) => {
      return (
        <div key={index} className={styles.imageContainer}>
          <img alt={'product'} src={img} />
        </div>
      );
    });
  };

  return (
    <div className={styles.root}>
      <div className={styles.cardGrid}>
        {images?.map((img, index) => {
          return (
            <div key={index} className={styles.imageContainer}>
              <img alt={img} src={img} />
            </div>
          );
        })}
      </div>
      <div className={styles.mobileSlider}>
        <Slider settings={customSliderSettings}>
          {images && renderImages()}
        </Slider>
      </div>
    </div>
  );
};

export default Gallery;
