import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MessageBox from "../../components/boxes/MessageBox";
import Product from "../../components/product/Product";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import "./CartPage.scss";

const CartPage = (props) => {
  //fetch qty and size
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const size = props.location.search
    ? props.location.search.split("=")[3]
    : "No sizing selected";

  //fetch cart items
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  console.log(cartItems);

  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, size));
    }
  }, [dispatch, productId, qty, size]);

  const removeFromCartHandler = (id, size) => {
    dispatch(removeFromCart(id, size));
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <section className="cart">
      <h1 className="cart__title">Cart details</h1>

      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <p className="emptyCart__p">Cart is empty </p>
          <Link to="/">SHOP NOW!</Link>
        </div>
      ) : (
        <ul className="items">
          {cartItems.map((item) => {
            return (
              <li key={item.productId} className="item">
                <div className="infoWrap">
                  <img className="item__img" src={item.image} alt={item.name} />

                  <Link
                    className="item__title"
                    to={`/product/${item.productId}`}
                  >
                    {item.name}
                  </Link>
                  <p className="item__price">${item.price}</p>
                  <div className="item__selects">
                    <select
                      className="item__select"
                      value={item.qty}
                      name=""
                      id=""
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.productId, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => {
                        return (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        );
                      })}
                    </select>
                    {item.type === "apparel" && (
                      <select
                        className="item__select"
                        name="size"
                        value={size}
                        onChange={(e) => dispatch(addToCart(item.size))}
                      >
                        <option name="size">S</option>
                        <option name="size">M</option>
                        <option name="size">L</option>
                        <option name="size">XL</option>
                      </select>
                    )}
                  </div>
                </div>

                <div className="item__delete">
                  <button
                    className="item__delete__btn"
                    typeof="button"
                    onClick={() =>
                      removeFromCartHandler(item.productId, item.size)
                    }
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <div className="summary">
        <h2 className="summary__title">
          Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
          {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </h2>

        <button
          type="button"
          onClick={checkoutHandler}
          className="summary__button"
          disabled={cartItems.length === 0}
        >
          Proceed to checkout
        </button>
      </div>
    </section>
  );
};

export default CartPage;
