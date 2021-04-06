import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import "./CartPage.scss";

const CartPage = (props) => {
  const [filteredItems, setFilteredItems] = useState([]);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { productId, qty, size } = cartItems;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const searchProduct = useSelector((state) => state.searchProduct);

  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, size));
    }
  }, [dispatch, productId, qty, size]);

  useEffect(() => {
    // console.log("Products: ", products);

    if (cartItems) {
      setFilteredItems(
        cartItems.filter((item) => {
          return item.name.toLowerCase().includes(searchProduct.toLowerCase());
        })
      );
    }
  }, [cartItems, searchProduct]);

  const removeFromCartHandler = (id, size) => {
    dispatch(removeFromCart(id, size));
  };

  const checkoutHandler = () => {
    if (userInfo) {
      props.history.push("/shipping");
    } else {
      props.history.push("/signin");
    }
  };

  return (
    <section className="cart">
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <p className="emptyCart__p">Cart is empty </p>
          <Link className="shopNow" to="/">
            SHOP NOW!
          </Link>
        </div>
      ) : (
        <>
          <h1 className="cart__title">Cart details</h1>
          <ul className="items">
            {filteredItems.map((item) => {
              return (
                <li key={`${item.productId}${item.size}`} className="item">
                  <div className="infoWrap">
                    <div className="imgwrap">
                      <img
                        className="item__img"
                        src={item.image}
                        alt={item.name}
                      />
                    </div>
                    <div className="detailsWrap">
                      <Link
                        className="item__title"
                        to={`/product/${item.productId}`}
                      >
                        {item.name}
                      </Link>
                      <p className="item__price">${item.price}</p>
                      {item.type === "Apparel" ? (
                        <div className="item__selects">
                          <select
                            className="item__select"
                            value={item.qty}
                            name=""
                            id=""
                            onChange={(e) =>
                              dispatch(
                                addToCart(
                                  item.productId,
                                  Number(e.target.value),
                                  item.size
                                )
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
                          <select
                            className="item__select"
                            name="size"
                            value={item.size}
                            onChange={(e) =>
                              dispatch(
                                addToCart(
                                  item.productId,
                                  item.qty,
                                  e.target.value
                                )
                              )
                            }
                          >
                            {item.sizes.map((size) => {
                              return (
                                <option key={size} name="size">
                                  {size}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      ) : item.type !== "Tab" ? (
                        <select
                          className="item__select music__select"
                          value={item.qty}
                          name=""
                          id=""
                          onChange={(e) =>
                            dispatch(
                              addToCart(
                                item.productId,
                                Number(e.target.value),
                                item.size
                              )
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
                      ) : (
                        ""
                      )}

                      <div className="item__delete">
                        <button
                          className="item__delete__btn"
                          typeof="button"
                          onClick={() =>
                            removeFromCartHandler(item.productId, item.size)
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="summary">
            <h2 className="summary__title">
              Subtotal (
              {cartItems.reduce((a, c) => Number(a) + Number(c.qty), 0)} items)
              : ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
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
        </>
      )}
    </section>
  );
};

export default CartPage;
