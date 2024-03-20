import React from 'react';
import * as styles from './ProductCollectionGrid.module.css';

import ProductCollection from '../ProductCollection';

const ProductCollectionGrid = (props) => {
  return (
    <div className={styles.root}>
      <ProductCollection
        image={'/men.png'}
        title={'MAIN_PAGE.section2.forMan'}
        text={'MAIN_PAGE.section2.buy'}
        link={'/shop?gender=man'}
      />
      <ProductCollection
        image={'/run.jpeg'}
        title={'MAIN_PAGE.section2.forWoman'}
        text={'MAIN_PAGE.section2.buy'}
        link={'/shop?gender=woman'}
      />
      {/* <ProductCollection
        image={'/collections/collection3.png'}
        title={'Accessories'}
        text={'SHOP NOW'}
        link={'/shop'}
      />
      <ProductCollection
        image={'/collections/collection4.png'}
        title={'Simple Cotton'}
        text={'SHOP NOW'}
        link={'/shop'}
      /> */}
    </div>
  );
};

export default ProductCollectionGrid;
