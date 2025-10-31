import { useEffect, useState } from "react";
import type { CartItem } from "../types/CartItem";
import type { Product, ProductSize } from "../types/Product";
import { CartContext } from "./CartContext";
const CartProvider = ({ children }: any) => {
  const [isCartOpened, setIsCartOpened] = useState(false);
  const toggleCart = () => setIsCartOpened((prev) => !prev);
  const openCart = () => setIsCartOpened(true); // Helper function
  const closeCart = () => setIsCartOpened(false); // Helper function
  const getInitialCart = (): CartItem[] => {
    const storedCart = localStorage.getItem("aetheria_cart");
    if (!storedCart) return [];

    try {
      const parsed = JSON.parse(storedCart) as CartItem[];
      return parsed.map((item) => ({
        ...item,
        size: item.size || 0, // Default size to 0 or a known default value
      }));
    } catch (e) {
      console.error("Failed to parse cart from localStorage:", e);
      return []; // Return empty array on parse error
    }
  };

  const [cartItems, setCartItems] = useState<CartItem[]>(getInitialCart);

  useEffect(() => {
    // This effect runs once after the initial render AND after every setCartItems update.
    localStorage.setItem("aetheria_cart", JSON.stringify(cartItems));
  }, [cartItems]);
  const addItemToCart = (
    product: Product,
    selectedSize: ProductSize,
    quantityNumber: number
  ) => {
    setCartItems((prevItems) => {
      // 1. Check if the item already exists
      const existingItem = prevItems.find(
        (item) =>
          item.product.id === product.id &&
          item.size.label === selectedSize.label
      );

      if (existingItem) {
        return prevItems.map((item) => {
          if (
            item.product.id === product.id &&
            item.size.label === selectedSize.label
          ) {
            return {
              ...item,
              quantity: item.quantity + quantityNumber,
            };
          }
          return item;
        });
      }

      return [
        ...prevItems,
        { product, size: selectedSize, quantity: quantityNumber },
      ];
    });
  };

  const updateItemQuantity = (
    productId: string,
    changeAmount: number,
    sizeLabel: string
  ) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) =>
        // 1. Check if the IDs match
        item.product.id === productId && item.size.label === sizeLabel
          ? // 2. If TRUE (Match): Return a new object with the updated quantity.
            //    We use the spread operator to keep all other properties (product, size, etc.)
            {
              ...item,
              quantity: item.quantity + changeAmount,
            }
          : // 3. If FALSE (No Match): Return the original, unchanged item.
            item
      );
    });
  };

  const removeItemFromCart = (productId: string, sizeLabel: string) => {
    setCartItems((prevItems) => {
      return prevItems.filter(
        (item) => item.product.id !== productId || item.size.label !== sizeLabel
      );
    });
  };
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("aetheria_cart");
  };
  const contextValue = {
    items: cartItems,
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart,
    clearCart,
    isCartOpened,
    openCart,
    closeCart,
    toggleCart,
  };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
