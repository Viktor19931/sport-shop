import React from 'react';
import { Link } from 'gatsby';

import * as styles from './Brand.module.css';

const Brand = (props) => {
  return (
    <Link to="/">
      <h2 style={{ textAlign: 'center', lineHeight: '20px' }}>Elite Sport</h2>
    </Link>
  );
};

export default Brand;
