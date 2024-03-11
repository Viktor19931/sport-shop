import React from 'react';

import Attribute from '../Attribute';

import * as styles from './AttributeGrid.module.css';

const AttributeGrid = (props) => {
  return (
    <div className={styles.root}>
      <Attribute
        icon={'delivery'}
        title={'безкоштовна доставка'}
        subtitle={'по всьому світу'}
      />
      <Attribute
        icon={'cycle'}
        title={'повернення'}
        subtitle={'протягом 30 днів'}
      />
      <Attribute
        icon={'creditcard'}
        title={'Безпечна оплата'}
        subtitle={'Купуйте безпечно'}
      />
    </div>
  );
};

export default AttributeGrid;
