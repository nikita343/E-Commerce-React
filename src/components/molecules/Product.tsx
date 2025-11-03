import { Link } from "react-router";

const Product = ({ productData, productIndex }: any) => {
  return (
    <div className="product__card">
      <Link
        to={`/products/${productData.slug}`}
        className="product__image__wrapper"
      >
        {productData.imageUrl.length > 1 ? (
          <img
            className={`product__image ${
              productData.imageGalleryUrls.length > 0 && "v1"
            }`}
            src={productData.imageUrl}
            alt={productData.name}
          />
        ) : (
          <img
            className="product__image"
            src="/images/notfound.png"
            alt={productData.name}
          />
        )}
        {productData.imageGalleryUrls.length > 0 && (
          <img
            className="product__image v2"
            src={productData.imageGalleryUrls[0]}
            alt={productData.name}
          />
        )}
        {productData.imageGalleryUrls.length > 1 && (
          <img
            className="product__image v3"
            src={productData.imageGalleryUrls[1]}
            alt={productData.name}
          />
        )}
      </Link>
      <div className="product__text__wrapper">
        <p className="text-size-regular">{productIndex} </p>
        <h3 className="text-size-large">{productData.name}</h3>
      </div>
      <Link to={`/products/${productData.slug}`} className="button outline">
        Starting from{" "}
        {"$" +
          productData.sizes[0].price
            .toFixed(2)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
      </Link>
    </div>
  );
};

export default Product;
