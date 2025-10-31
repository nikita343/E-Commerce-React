import Subtitle from "../molecules/Subtitle";
import ProductList from "../organisms/ProductList";
import { Link } from "react-router";

const ProductSection = () => {
  return (
    <section className="product">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-small">
            <div className="product__component">
              <div className="product__heading_wrapper">
                <Subtitle text={"Every age has its aura."} />

                <h2 className="heading-style-h2">
                  Each bottle holds a story -<br /> a moment distilled, a memory
                  reborn.
                </h2>
              </div>
              <ProductList />
              <div className="product__button__wrapper">
                <Link to={"/products"} className="button">
                  View all Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
