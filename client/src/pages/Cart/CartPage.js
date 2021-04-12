import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import "./CartPage.scss";

const CartPage = (props) => {
  //PULL FROM STORE
  const [filteredItems, setFilteredItems] = useState([]);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { productId, qty, size, type } = cartItems;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const searchProduct = useSelector((state) => state.searchProduct);

  //ADD TO CART
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, size, type));
    }
  }, [dispatch, productId, qty, size, type]);

  //SEARCH FUNCTIONALITY
  useEffect(() => {
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

  //ON CHECKOUT
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
          <p className="emptyCart__text">Cart is empty </p>
          <Link className="shopNow" to="/">
            SHOP NOW!
          </Link>
        </div>
      ) : (
        <>
          <h1 className="cart__title">Cart details</h1>
          <ul className="cart__items">
            {filteredItems.map((item) => {
              return (
                <li key={`${item.productId}${item.size}`} className="cartItem">
                  <div className="cartItem__container">
                    <div className="cartItem__imgContainer">
                      <img
                        className="cartItem__img"
                        src={item.image}
                        alt={item.name}
                      />
                    </div>
                    <div className="cartItem__detailsContainer">
                      <Link
                        className="cartItem__title"
                        to={`/product/${item.productId}`}
                      >
                        {item.name}
                      </Link>
                      <p className="cartItem__price">${item.price}</p>
                      {item.type === "Apparel" ? (
                        <div className="cartItem__selectsContainer">
                          <select
                            className="cartItem__select"
                            name="size"
                            value={item.size}
                            onChange={(e) =>
                              dispatch(
                                addToCart(
                                  item.productId,
                                  item.qty,
                                  e.target.value,
                                  item.sizesOb
                                )
                              )
                            }
                          >
                            {Object.keys(item.sizesOb).map((size) => {
                              return (
                                <option key={size} name="size">
                                  {size}
                                </option>
                              );
                            })}
                          </select>
                          <select
                            className="cartItem__select"
                            value={item.qty}
                            name=""
                            id=""
                            onChange={(e) =>
                              dispatch(
                                addToCart(
                                  item.productId,
                                  Number(e.target.value),
                                  item.size,
                                  item.sizesOb
                                )
                              )
                            }
                          >
                            {item.size === "S" &&
                              [...Array(item.sizesOb.S).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            {item.size === "M" &&
                              [...Array(item.sizesOb.M).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            {item.size === "L" &&
                              [...Array(item.sizesOb.L).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            {item.size === "XL" &&
                              [...Array(item.sizesOb.XL).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                          </select>
                        </div>
                      ) : item.type !== "Tab" ? (
                        <select
                          className="cartItem__select music__select"
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

                      <div className="cartItem__removeBtnContainer">
                        <button
                          className="cartItem__removeBtn"
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

          <div className="cartSummary">
            <h2 className="cartSummary__title">
              Subtotal (
              {cartItems.reduce((a, c) => Number(a) + Number(c.qty), 0)} items)
              : ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            </h2>

            <button
              type="button"
              onClick={checkoutHandler}
              className="cartSummary__button"
              disabled={cartItems.length === 0}
            >
              Proceed to checkout
            </button>
            <Link to="/">
              <button type="button" className="cartSummary__linkToHome">
                BACK TO PRODUCTS
              </button>
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default CartPage;
