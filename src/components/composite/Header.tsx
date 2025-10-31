import videoSrc from "../../assets/videos/header-video-v2.mp4";
import HeaderSwiper from "../molecules/HeaderSwiper";

const Header = () => {
  return (
    <section className="header">
      <video
        className="header__video"
        loop
        muted
        autoPlay
        playsInline
        preload="metadata"
        poster="/assets/images/poster.jpeg"
      >
        <source
          className="header__video__source"
          src={videoSrc}
          type="video/mp4"
        />
        Your browser does not support HTML5 video.
      </video>

      <div className="header__component">
        <div className="header__item span-two">
          <div className="header__item__heading_wrapper">
            <h1 className="heading-style-h1">
              Moments, Distilled into Fragrance.
            </h1>
          </div>
        </div>
        <div className="header__wrapper">
          <div className="header__item__box">
            <div className="header__item__label">Latest Realizes</div>
            <HeaderSwiper />
          </div>

          <div className="header__item__box v2">
            <div className="header__item__label">Introduction</div>
            <div className="header__item__text_box">
              <p className="text-size-regular">
                Step into Aetheria, a conceptual fragrance atelier where scent
                transcends centuries. Explore perfumes inspired by lost worlds,
                future dreams, and timeless emotions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
