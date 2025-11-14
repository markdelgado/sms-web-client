import { createContext, useState } from "react";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCart((currentCart) => {
      const exists = currentCart.find((item) => item.sku === product.sku);
      if (exists) {
        return currentCart.map((item) =>
          item.sku === product.sku
            ? { ...item, quantity: (item.quantity ?? 0) + quantity }
            : item
        );
      }
      return [...currentCart, { ...product, quantity: quantity ?? 1 }];
    });
  };

  const changeQuantity = (sku, delta) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.sku === sku
            ? { ...item, quantity: Math.max((item.quantity ?? 0) + delta, 0) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (sku) => {
    setCart(cart.filter((item) => item.sku !== sku));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, changeQuantity }}>
      {children}
    </CartContext.Provider>
  );
}


export default CartProvider;
