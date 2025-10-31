import type { Product, ProductSize } from "./Product";
import type { CartItem } from "./CartItem";

export interface CartContextType {
  items: CartItem[];

  addItemToCart: (
    product: Product,
    selectedSize: ProductSize,
    quantityNumber: number
  ) => void;
  removeItemFromCart: (productId: string, sizeLabel: string) => void;

  clearCart: () => void;

  isCartOpened: boolean;

  openCart: () => void;

  closeCart: () => void;

  toggleCart: () => void;

  updateItemQuantity: (
    productId: string,
    changeAmount: number,
    sizeLabel: string
  ) => void;
}
