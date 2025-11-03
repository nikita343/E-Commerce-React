import { useEffect, useMemo } from "react";
import { useCart } from "../../hooks/useCart";
import MinusSign from "../svgs/MinusSign";
import PlusSign from "../svgs/PlusSign";
import SvgCrossIcon from "../svgs/SvgCrossIcon";

const Cart = () => {
  const {
    items,
    clearCart,
    removeItemFromCart,
    updateItemQuantity,
    isCartOpened,
    closeCart,
  } = useCart();

  const totalItems = items.reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity,
    0
  );
  const totalPrice = useMemo(() => {
    if (items.length === 0) {
      return 0;
    }

    return items.reduce((total, item) => {
      const itemPrice = item.size.price * item.quantity;
      return total + itemPrice;
    }, 0);
  }, [items]);
  useEffect(() => {
    // Define the event handler function
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isCartOpened) {
        closeCart();
      }
    };

    // 1. Attach the event listener to the document
    document.addEventListener("keydown", handleEscape);

    // 2. Cleanup: Crucial step to prevent memory leaks!
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };

    // 💡 Dependency: The effect only needs to rerun if closeCart or isCartOpened changes
  }, [closeCart, isCartOpened]);
  return (
    <div className={`cart ${isCartOpened && "is-opened"}`}>
      <div className="cart__line"></div>

      <div className="cart__component">
        <div className="cart__top_box">
          <div className="cart__top">
            <div className="cart__top__left">
              <p className="text-size-regular">My Cart</p>
              <p className="text-size-small">
                ({totalItems} {totalItems === 1 ? "item" : "items"})
              </p>
            </div>
            <button
              disabled={totalItems === 0}
              className={`button__link ${totalItems === 0 && "disabled"}`}
              onClick={() => clearCart()}
            >
              Clear Cart
            </button>
          </div>

          <div className="cart__list__wrapper">
            {totalItems === 0 ? (
              <div className="cart__list__empty">
                <p className="text-size-regular u-opacity-6">No items found.</p>
              </div>
            ) : (
              items.map((item) => {
                return (
                  <div className="cart__list">
                    <div className="cart__list__item">
                      <div className="cart__list__item__quantity">
                        <button
                          onClick={() =>
                            updateItemQuantity(
                              item.product.id,
                              +1,
                              item.size.label
                            )
                          }
                          className="product_page__quantity_button"
                        >
                          <PlusSign />
                        </button>
                        {item.quantity}
                        <button
                          onClick={() =>
                            item.quantity > 1 &&
                            updateItemQuantity(
                              item.product.id,
                              -1,
                              item.size.label
                            )
                          }
                          className={`product_page__quantity_button ${
                            item.quantity <= 1 && "disabled"
                          }`}
                        >
                          <MinusSign />
                        </button>
                      </div>
                      <img
                        src={
                          item.product.imageUrl.length > 1
                            ? item.product.imageUrl
                            : "/images/notfound.png"
                        }
                        alt={item.product.name}
                        className="cart__list__item__image"
                      />

                      <div className="cart__list__item__info">
                        <p className="text-size-regular u-weight-600">
                          {item.product.name}
                        </p>
                        <div className="cart__list__item__info__bottom">
                          <div className="cart__list__item__info__bottom__wrapper">
                            <p className="text-size-small">
                              Quantity:&nbsp;
                              <span className="u-weight-600">
                                {item.quantity}
                              </span>
                            </p>

                            <p className="text-size-small">
                              Bottle Size:&nbsp;
                              <span className="u-weight-600">
                                {item.size.label}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="cart__list__item__right">
                        <button
                          onClick={() =>
                            removeItemFromCart(item.product.id, item.size.label)
                          }
                          className="cart__list__item__close"
                        >
                          <SvgCrossIcon />
                        </button>
                        <p className="text-size-medium">
                          {"$" +
                            item.size.price
                              .toFixed(2)
                              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom__left">
            <p className="text-size-small">Subtotal</p>
            <div className="text-size-large">
              {"$" +
                totalPrice.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
