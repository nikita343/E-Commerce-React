import { getCurrentYear } from "../../utils/getCurrentYear";
import Subtitle from "../molecules/Subtitle";
import videoSrc from "../../assets/videos/aboutVideo.mp4";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);
const AboutSection = () => {
  const aboutComponent = useRef(null);
  const videoWrapperRef = useRef(null);
  const aboutLogoRef = useRef(null);
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutComponent.current,
          start: "bottom top",
          end: "+=100%",
          scrub: 1,
        },
      });
      tl.to(videoWrapperRef.current, {
        width: "100vw",
        borderRadius: "0rem",
        height: "100%",
      });
      tl.from(
        aboutLogoRef.current,
        {
          opacity: 0,
          scale: 0.5,
        },
        "0.1"
      );
      tl.to({}, { duration: 0.3 }, "0.4");
    },
    { scope: videoWrapperRef }
  );

  const currentyear = getCurrentYear();
  return (
    <section className="about">
      <div className="about__container">
        <div className="about__component" ref={aboutComponent}>
          <div className="about__top">
            <p className="text-size-regular u-weight-600">ae</p>
            <Subtitle text={"Project Showcase #2"} />
            <p className="text-size-regular u-weight-600">{currentyear}</p>
          </div>
        </div>
        <div className="about__wrapper">
          <h2 className="heading-style-h2 about__text">Time doesn’t pass.</h2>
          <div className="about__video__wrapper" ref={videoWrapperRef}>
            <video
              className="about__video"
              loop
              muted
              autoPlay
              playsInline
              preload="metadata"
              poster="/assets/images/poster.jpeg"
            >
              <source
                className="about__video__source"
                src={videoSrc}
                type="video/mp4"
              />
              Your browser does not support HTML5 video.
            </video>
            <svg
              ref={aboutLogoRef}
              className="about__logo"
              width="1212"
              height="954"
              viewBox="0 0 1212 954"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M858.846 805.854H906.357V942.904H824.127C699.868 942.904 657.84 889.911 656.012 798.544C597.538 882.602 504.344 953.868 343.539 953.868C138.877 953.868 0 851.537 0 681.595C0 495.207 129.741 391.049 374.603 391.049H648.703V327.093C648.703 206.489 562.818 133.395 416.632 133.395C285.064 133.395 197.352 195.525 179.079 290.546H29.2373C51.1653 107.813 199.179 0 423.941 0C661.494 0 798.544 118.777 798.544 336.229V743.724C798.544 793.062 816.818 805.854 858.846 805.854ZM648.703 562.818V517.135H359.984C226.589 517.135 151.669 566.473 151.669 672.458C151.669 763.825 230.244 825.954 354.503 825.954C540.89 825.954 648.703 718.142 648.703 562.818Z"
                fill="currentcolor"
              />
              <path
                d="M1003.28 851.537C1003.28 789.408 1047.13 749.206 1107.43 749.206C1167.74 749.206 1211.59 789.408 1211.59 851.537C1211.59 913.666 1167.74 953.868 1107.43 953.868C1047.13 953.868 1003.28 913.666 1003.28 851.537Z"
                fill="currentcolor"
              />
            </svg>
          </div>
          <h2 className="heading-style-h2 about__text">It transforms.</h2>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
