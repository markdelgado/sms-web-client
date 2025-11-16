import { createContext, useEffect, useState } from "react";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  //load cart from local storage from intitial render
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("sms_cart");
    return stored ? JSON.parse(stored) : [];
  });

  //save cart to local storage on cart change
  useEffect(() => {
    localStorage.setItem("sms_cart", JSON.stringify(cart));
  }, [cart]);
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
