import React from 'react';

import Attribute from '../Attribute';

import * as styles from './AttributeGrid.module.css';

const AttributeGrid = (props) => {
  return (
    <div className={styles.root}>
      <Attribute
        icon={'delivery'}
        title="MAIN_PAGE.section8.title1"
        subtitle="MAIN_PAGE.section8.subTitle1"
      />
      <Attribute
        icon={'cycle'}
        title="MAIN_PAGE.section8.title2"
        subtitle="MAIN_PAGE.section8.subTitle2"
      />
      <Attribute
        icon={'creditcard'}
        title="MAIN_PAGE.section8.title3"
        subtitle="MAIN_PAGE.section8.subTitle3"
      />
    </div>
  );
};

export default AttributeGrid;
