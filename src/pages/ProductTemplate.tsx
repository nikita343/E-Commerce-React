import { useParams } from "react-router";
import productData from "../assets/products.json";
import type { Product, ProductSize } from "../types/Product";
import { useEffect, useState } from "react";
import BreadCrumbs from "../components/molecules/BreadCrumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import MainGalleryNavigation from "../components/molecules/MainGalleryNavigation";
import { Scrollbar, Controller, A11y, EffectFade } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import FsLightbox from "fslightbox-react";

import MinusSign from "../components/svgs/MinusSign";
import PlusSign from "../components/svgs/PlusSign";
import { useCart } from "../hooks/useCart";
import useDocumentTitle from "../hooks/useDocumentTitle";

const ProductTemplate = () => {
  const { slug } = useParams();
  const [mainSwiper, setMainSwiper] = useState<SwiperClass | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(
    undefined
  );
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  });
  const [finalPrice, setFinalPrice] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize | undefined>(
    undefined
  );
  const [quantityNumber, setquantityNumber] = useState(1);
  const { addItemToCart, toggleCart, isCartOpened } = useCart();

  function openLightboxOnSlide(number: any) {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: number,
    });
  }
  useEffect(() => {
    // This runs once on mount and whenever the URL slug changes
    const product = productData.find((p) => p.slug === slug);
    setCurrentProduct(product);
  }, [slug]);

  useDocumentTitle(
    `${
      currentProduct ? currentProduct?.name : `Product not found`
    } | Aetheria | Fragrances Beyond Eras`
  );

  useEffect(() => {
    // 1. Check for valid data
    if (
      currentProduct &&
      currentProduct.sizes &&
      currentProduct.sizes.length > 0
    ) {
      // 2. Set the initial selected size object (this is the state that controls the select box)
      // If selectedSize is already set (e.g., user navigated back), don't overwrite it.
      if (!selectedSize) {
        setSelectedSize(currentProduct.sizes[0]);
      }

      // 3. SET THE INITIAL PRICE: Calculate price based on default size (0) and quantity (1)
      // This ensures the price is immediately correct on the first render after data loads.
      const initialPrice = currentProduct.sizes[0].price * quantityNumber;
      setFinalPrice(initialPrice);
    }

    // Dependencies: If the product itself changes, re-initialize.
    // We include selectedSize here so the effect runs immediately if it was null/undefined.
  }, [currentProduct, quantityNumber, selectedSize]);
  useEffect(() => {
    // If the calculation effect runs, it overrides the initial price calculation.
    if (selectedSize) {
      const calculatedPrice = selectedSize.price * quantityNumber;
      setFinalPrice(calculatedPrice);
    }

    // Dependencies: This runs instantly whenever the user changes the size or the quantity.
  }, [selectedSize, quantityNumber]);
  if (!currentProduct) {
    return (
      <>
        <p>text</p>
      </>
    );
  }

  const allImageUrls = [
    currentProduct.imageUrl,
    ...currentProduct.imageGalleryUrls,
  ];

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // The event.target.value is the 'value' of the selected <option> (the size.label)
    const selectedLabel = event.target.value;

    // Find the full size object that matches the label
    const newSize = currentProduct.sizes.find(
      (size) => size.label === selectedLabel
    );

    // Update the state with the found object (safe because of the guardrail)
    if (newSize) {
      setSelectedSize(newSize);
    }
  };

  return (
    <>
      <section className="product_page__top">
        <img
          src={currentProduct?.bgImage}
          className="product_page__top__image"
          alt={currentProduct?.name}
        />
      </section>
      <section className="product_page__component">
        <BreadCrumbs />
        <div className="product_page__wrapper">
          <div className="product_page__text__wrapper">
            <div className="product_page__text__wrapper__top">
              <h1 className="heading-style-h3">{currentProduct.name}</h1>
              <p className="text-size-regular ">{currentProduct.description}</p>
            </div>
            <div className="product_page__list">
              <div className="product_page__list__item">
                <p className="text-size-small">Collection</p>
                <p className="text-size-small u-weight-600">
                  {currentProduct.no}
                </p>
              </div>
              <div className="product_page__list__item">
                <p className="text-size-small">Notes</p>
                <p className="text-size-small u-weight-600">
                  {currentProduct.notes.join(", ")}
                </p>
              </div>
              <div className="product_page__list__item">
                <p className="text-size-small">Edition</p>
                <p className="text-size-small u-weight-600">
                  {currentProduct.edition}
                </p>
              </div>
              <div className="product_page__list__item">
                <p className="text-size-small">Location</p>
                <p className="text-size-small u-weight-600">
                  {currentProduct.location}
                </p>
              </div>
            </div>
          </div>
          {allImageUrls.length > 1 || currentProduct.imageUrl.length > 1 ? (
            <div className="product_page__item">
              <div className="product_page__swiper__wrapper">
                <Swiper
                  modules={[Scrollbar, A11y, Controller, EffectFade]}
                  spaceBetween={0}
                  onSwiper={(swiper) => setMainSwiper(swiper)}
                  controller={{ control: thumbsSwiper }}
                  slidesPerView={1}
                  effect="fade"
                  fadeEffect={{ crossFade: true }}
                  speed={400}
                >
                  {allImageUrls.length > 1 && (
                    <MainGalleryNavigation swiper={mainSwiper} />
                  )}
                  {allImageUrls.map((el, index) => {
                    return (
                      <SwiperSlide>
                        <img
                          onClick={() => openLightboxOnSlide(index + 1)}
                          src={el}
                          className="product_page__image"
                          alt={currentProduct.name}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>

              <div className="product_page__item__divider"></div>
              {allImageUrls.length > 1 && (
                <Swiper
                  modules={[Scrollbar, A11y, Controller]}
                  spaceBetween={8}
                  slidesPerView={3}
                  controller={{ control: mainSwiper }}
                  onSwiper={(swiper) => setThumbsSwiper(swiper)}
                >
                  {allImageUrls.map((el, index) => {
                    return (
                      <SwiperSlide onClick={() => mainSwiper?.slideTo(index)}>
                        <img
                          src={el}
                          className="product_page__image sm"
                          alt={currentProduct.name}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              )}
            </div>
          ) : (
            <div className="product_page__item">
              <div className="product_page__swiper__wrapper">
                <img
                  src="/images/notfound.png"
                  className="product_page__image"
                  alt={currentProduct.name}
                />
              </div>
            </div>
          )}
          <div className="product_page__right">
            <div className="product_page__list">
              <div className="product_page__list__item">
                <p className="text-size-regular">QTY: </p>
                <div className="product_page__quantity_wrapper">
                  <button
                    className={`product_page__quantity_button ${
                      quantityNumber <= 1 && "disabled"
                    }`}
                    onClick={() =>
                      setquantityNumber(
                        quantityNumber > 1 ? quantityNumber - 1 : quantityNumber
                      )
                    }
                  >
                    <MinusSign />
                  </button>
                  {quantityNumber}
                  <button
                    className="product_page__quantity_button"
                    onClick={() => setquantityNumber(quantityNumber + 1)}
                  >
                    <PlusSign />
                  </button>
                </div>
              </div>
              <div className="product_page__list__item">
                <p className="text-size-regular">Bottle Size: </p>
                <select
                  onChange={(e) => handleSizeChange(e)}
                  className="product_page__select"
                  value={selectedSize?.label || currentProduct.sizes[0].label}
                >
                  {currentProduct.sizes.map((size) => {
                    return (
                      <option key={size.label} value={size.label}>
                        {size.label}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="product_page__list__item">
                <div className="product_page__button_wrapper">
                  <button
                    onClick={() => {
                      if (!selectedSize) {
                        setSelectedSize(currentProduct.sizes[0]);
                        return;
                      }
                      addItemToCart(
                        currentProduct,
                        selectedSize, // This is now guaranteed to be ProductSize
                        quantityNumber
                      );

                      // Optional: Open the cart panel immediately after adding the item.
                      isCartOpened !== true && toggleCart();
                    }}
                    className="button outline"
                  >
                    Add to cart &nbsp;
                    {"$" +
                      finalPrice
                        .toFixed(2)
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FsLightbox
        toggler={lightboxController.toggler}
        sources={allImageUrls}
        slide={lightboxController.slide}
      />
    </>
  );
};

export default ProductTemplate;
