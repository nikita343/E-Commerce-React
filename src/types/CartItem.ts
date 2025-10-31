import type { Product, ProductSize } from "./Product";

export interface CartItem {
  product: Product;
  size: ProductSize;
  quantity: number;
}
