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
      <div>
        <Slider settings={customSliderSettings}>
          {images && renderImages()}
        </Slider>
      </div>
    </div>
  );
};

export default Gallery;
