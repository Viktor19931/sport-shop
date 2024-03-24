import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const savedItems = localStorage.getItem('cart');
    savedItems && setItems(JSON.parse(savedItems));
  }, []);

  const setItem = (item) => {
    let newItems = [...items];
    const isExistItem = newItems.some((i) => i.id === item.id);

    if (isExistItem) {
      console.log(items);

      newItems = newItems.map((it) =>
        it.id === item.id ? { ...it, quantity: Math.max(1, item.quantity) } : it
      );
    } else {
      newItems = [...newItems, item];
    }

    setItems(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
  };

  const deleteItems = (id) => {
    const newItems = items.filter((it) => it.id !== id);

    console.log(id);

    setItems(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
  };

  const totalPrice = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        totalPrice,
        setItem,
        deleteItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
