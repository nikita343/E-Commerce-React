import { getCurrentYear } from "../../utils/getCurrentYear";

const Footer = () => {
  const currentyear = getCurrentYear();

  return (
    <div className="footer">
      <div className="footer__logo">aetheria.</div>
      <div className="footer__text__wrapper">
        <p className="text-size-regular">
          Code: V9-Orchid-Sable | Ver. 3.7.2.Φ
          <br />
        </p>
        <p className="text-size-small">
          © Aetheria {currentyear}. All sensations reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
