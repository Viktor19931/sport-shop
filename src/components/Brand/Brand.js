import React from 'react';
import { Link } from 'gatsby';

import * as styles from './Brand.module.css';

const Brand = (props) => {
  return (
    <Link to="/" className={styles.root}>
      <span className={styles.wordmark}>Max Sport</span>
    </Link>
  );
};

export default Brand;
