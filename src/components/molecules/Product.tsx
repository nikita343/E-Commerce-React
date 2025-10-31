import { Link } from "react-router";

const Product = ({ productData, productIndex }: any) => {
  return (
    <div className="product__card">
      <Link
        to={`/products/${productData.slug}`}
        className="product__image__wrapper"
      >
        <img
          className="product__image v1"
          src={productData.imageUrl}
          alt={productData.name}
        />
        <img
          className="product__image v2"
          src={productData.imageGalleryUrls[0]}
          alt={productData.name}
        />
        <img
          className="product__image v3"
          src={productData.imageGalleryUrls[1]}
          alt={productData.name}
        />
      </Link>
      <div className="product__text__wrapper">
        <p className="text-size-regular">{productIndex} </p>
        <h3 className="text-size-large">{productData.name}</h3>
      </div>
      <Link to={`/products/${productData.slug}`} className="button outline">
        View more
      </Link>
    </div>
  );
};

export default Product;
