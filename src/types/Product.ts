export interface ProductSize {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  no: string;
  price: number;
  imageUrl: string;
  description: string;
  notes: string[];
  edition: string;
  imageGalleryUrls: string[];
  bgImage: string;
  slug: string;
  location: string;
  sizes: ProductSize[];
  createdAt: string;
}
