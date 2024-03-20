import React from 'react';

import { CartProvider } from './src/context/cartContext';
import { LocalizationProvider } from './src/context/localizationContext';

export const wrapRootElement = ({ element }) => (
  <LocalizationProvider>
    <CartProvider>{element}</CartProvider>
  </LocalizationProvider>
);
