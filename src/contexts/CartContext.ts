import { createContext } from "react";

import type { CartContextType } from "../types/CartContextType";

const defaultCartContext: CartContextType = {
  items: [],
  addItemToCart: () => {
    console.error("CartContext not initialized!");
  },
  updateItemQuantity: () => {
    console.error("CartContext not initialized!");
  },
  removeItemFromCart: () => {
    console.error("CartContext not initialized!");
  },
  clearCart: () => {
    console.error("CartContext not initialized!");
  },
  isCartOpened: false,

  openCart: () => {
    console.error("CartContext not initialized!");
  },

  closeCart: () => {
    console.error("CartContext not initialized!");
  },

  toggleCart: () => {
    console.error("CartContext not initialized!");
  },
};

export const CartContext = createContext<CartContextType>(defaultCartContext);
