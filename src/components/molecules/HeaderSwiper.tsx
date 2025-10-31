import { useEffect, useState } from "react";
import { Link } from "react-router";
import productData from "../../assets/products.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import MainGalleryNavigation from "./MainGalleryNavigation";
import { LiquidGlass } from "../composite/LiquidGlass";
// import "swiper/swiper.min.css";
// import "swiper/modules/pagination/pagination.min.css";
import type { Product } from "../../types/Product";
import { Swiper as SwiperClass } from "swiper";

const HeaderSwiper = () => {
  const [listOfProduct, setListOfProducts] = useState<Product[]>([]);
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null
  );

  useEffect(() => {
    const data = productData;
    setListOfProducts(data);
  }, []);
  return (
    <div className="header__swiper">
      <LiquidGlass
        borderRadius={20}
        blur={2}
        contrast={1}
        brightness={1}
        saturation={1.1}
        elasticity={0.8}
        displacementScale={1.5}
        shadowIntensity={0}
        className="header__swiper__bg"
      >
        <Swiper
          modules={[Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          speed={400}
          onSwiper={setSwiperInstance}
          pagination={{
            el: ".custom-pagination", // custom target outside swiper
            clickable: true,
          }}
        >
          {listOfProduct.slice(0, 3).map((el, index) => {
            return (
              <SwiperSlide>
                <div className="header__swiper__box">
                  <img
                    src={el.imageUrl}
                    className="header__swiper__image"
                    alt={el.name}
                  />
                  <div className="header__swiper__text__wrapper">
                    <div className="header__swiper__text__box">
                      <p className="text-size-medium">{el.name}</p>
                      <p className="text-size-regular u-weight-600 u-opacity-6">
                        {`0${index + 1}`}
                      </p>
                    </div>
                    <Link
                      to={`/products/${el.slug}`}
                      className="button outline small"
                    >
                      View more
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </LiquidGlass>
      <div className="header__swiper__buttons__wrapper">
        <MainGalleryNavigation swiper={swiperInstance} />
        <div className="custom-pagination" />
      </div>
    </div>
  );
};

export default HeaderSwiper;
