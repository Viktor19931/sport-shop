import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import Header from '../Header';
import Footer from '../Footer';
import * as styles from './Layout.module.css';

import { CartProvider } from '../../context/cartContext';
import { LocalizationProvider } from '../../context/localizationContext';

import './Globals.css';

const Layout = ({ props, children, disablePaddingBottom = false }) => {
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
      </Helmet>

      <LocalizationProvider>
        <CartProvider>
          <Header />
          <main
            className={`${styles.main} ${
              disablePaddingBottom === true ? styles.disablePaddingBottom : ''
            }`}
          >
            {children}
          </main>
          <Footer />
        </CartProvider>
      </LocalizationProvider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
