import { LiquidGlass } from "../composite/LiquidGlass";
import { useEffect, useState } from "react";

const MainGalleryNavigation = ({ swiper }: any) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  useEffect(() => {
    if (!swiper) return; // Guardrail in case swiper instance is null

    // 1. Listen for the 'slideChange' event
    swiper.on("slideChange", () => {
      // When a slide changes, update our local React state based on Swiper's status
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    });

    // 2. Cleanup: Remove the event listener when the component unmounts
    return () => {
      swiper.off("slideChange");
    };

    // Re-run effect only when 'swiper' instance is available or changes
  }, [swiper]);

  return (
    <>
      <button
        onClick={() => swiper.slidePrev()}
        disabled={isBeginning}
        className="button is-liquid product_page__item__button is-left"
      >
        <LiquidGlass
          borderRadius={20}
          blur={2}
          contrast={1}
          brightness={1.05}
          saturation={1.1}
          elasticity={0.8}
          displacementScale={2}
          shadowIntensity={0}
          className=""
        >
          <div className="button__icon__wrapper">
            <svg
              className="button__icon"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 8C1.44772 8 1 8.44772 1 9C1 9.55228 1.44772 10 2 10V9V8ZM16.7071 9.70711C17.0976 9.31658 17.0976 8.68342 16.7071 8.29289L10.3431 1.92893C9.95262 1.53841 9.31946 1.53841 8.92893 1.92893C8.53841 2.31946 8.53841 2.95262 8.92893 3.34315L14.5858 9L8.92893 14.6569C8.53841 15.0474 8.53841 15.6805 8.92893 16.0711C9.31946 16.4616 9.95262 16.4616 10.3431 16.0711L16.7071 9.70711ZM2 9V10H16V9V8H2V9Z"
                fill="white"
              />
            </svg>
            <svg
              className="button__icon v2"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 8C1.44772 8 1 8.44772 1 9C1 9.55228 1.44772 10 2 10V9V8ZM16.7071 9.70711C17.0976 9.31658 17.0976 8.68342 16.7071 8.29289L10.3431 1.92893C9.95262 1.53841 9.31946 1.53841 8.92893 1.92893C8.53841 2.31946 8.53841 2.95262 8.92893 3.34315L14.5858 9L8.92893 14.6569C8.53841 15.0474 8.53841 15.6805 8.92893 16.0711C9.31946 16.4616 9.95262 16.4616 10.3431 16.0711L16.7071 9.70711ZM2 9V10H16V9V8H2V9Z"
                fill="white"
              />
            </svg>
          </div>
        </LiquidGlass>
      </button>

      <button
        onClick={() => swiper.slideNext()}
        disabled={isEnd}
        className="button is-liquid product_page__item__button is-right"
      >
        <LiquidGlass
          borderRadius={20}
          blur={2}
          contrast={1}
          brightness={1.05}
          saturation={1.1}
          elasticity={0.8}
          displacementScale={2}
          shadowIntensity={0}
          className=""
        >
          <div className="button__icon__wrapper">
            <svg
              className="button__icon"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 8C1.44772 8 1 8.44772 1 9C1 9.55228 1.44772 10 2 10V9V8ZM16.7071 9.70711C17.0976 9.31658 17.0976 8.68342 16.7071 8.29289L10.3431 1.92893C9.95262 1.53841 9.31946 1.53841 8.92893 1.92893C8.53841 2.31946 8.53841 2.95262 8.92893 3.34315L14.5858 9L8.92893 14.6569C8.53841 15.0474 8.53841 15.6805 8.92893 16.0711C9.31946 16.4616 9.95262 16.4616 10.3431 16.0711L16.7071 9.70711ZM2 9V10H16V9V8H2V9Z"
                fill="white"
              />
            </svg>
            <svg
              className="button__icon v2"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 8C1.44772 8 1 8.44772 1 9C1 9.55228 1.44772 10 2 10V9V8ZM16.7071 9.70711C17.0976 9.31658 17.0976 8.68342 16.7071 8.29289L10.3431 1.92893C9.95262 1.53841 9.31946 1.53841 8.92893 1.92893C8.53841 2.31946 8.53841 2.95262 8.92893 3.34315L14.5858 9L8.92893 14.6569C8.53841 15.0474 8.53841 15.6805 8.92893 16.0711C9.31946 16.4616 9.95262 16.4616 10.3431 16.0711L16.7071 9.70711ZM2 9V10H16V9V8H2V9Z"
                fill="white"
              />
            </svg>
          </div>
        </LiquidGlass>
      </button>
    </>
  );
};

export default MainGalleryNavigation;
