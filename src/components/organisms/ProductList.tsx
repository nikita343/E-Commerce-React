import { useEffect, useState } from "react";
import type { Product as ProductType } from "../../types/Product";
import productData from "../../assets/products.json";
import Product from "../molecules/Product";
const ProductList = () => {
  const [listOfProduct, setListOfProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const data = productData;
    setListOfProducts(data);
  }, []);
  return (
    <div className="product__grid">
      {listOfProduct.slice(0, 3).map((product, index) => {
        return (
          <Product
            key={product.id}
            productData={product}
            productIndex={`(0${index + 1})`}
          />
        );
      })}
    </div>
  );
};

export default ProductList;
