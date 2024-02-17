import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext([]);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const savedItems = localStorage.getItem('cart');
    console.log('SSS savedItems ', JSON.parse(savedItems));
    savedItems && setItem(JSON.parse(savedItems));
  }, []);

  const setItem = (item) => {
    let newItems = [...items];
    const isExistItem = newItems.some((i) => i.id === item.id);

    if (isExistItem) {
      console.log(items);

      newItems = newItems.map((it) =>
        it.id === item.id
          ? { ...it, quantity: Math.max(1, it.quantity + item.quantity) }
          : it
      );
    } else {
      newItems = [...newItems, item];
    }

    setItems(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
  };

  const getItems = () => JSON.parse(localStorage.getItem('cart'));

  return (
    <CartContext.Provider
      value={{
        items,
        setItem,
        getItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
