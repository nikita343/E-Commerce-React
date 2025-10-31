import { LiquidGlass } from "./LiquidGlass";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import Cart from "./Cart";
import SearchInput from "../molecules/SearchInput";

const Navbar = () => {
  const { items, isCartOpened, toggleCart } = useCart();

  const totalItems = items.reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity,
    0
  );

  return (
    <nav className="navbar">
      <LiquidGlass
        borderRadius={20}
        blur={2}
        contrast={1}
        brightness={1.05}
        saturation={1.1}
        elasticity={0.8}
        displacementScale={2}
        shadowIntensity={0}
      >
        <div className="navbar__wrapper">
          <div className="navbar__component">
            <Link to="/" className="navbar__logo">
              Aetheria.
            </Link>

            <div className="navbar__menu__wrapper">
              <Link to="/products" className="navbar__link">
                Products
              </Link>

              <button
                className="button is-liquid is-cart"
                onClick={() => toggleCart()}
              >
                {isCartOpened ? "Close Cart" : "Cart"}
                <span className="is-cart">{totalItems}</span>
              </button>
            </div>
          </div>
          <SearchInput />
          <Cart />
        </div>
      </LiquidGlass>
    </nav>
  );
};

export default Navbar;
