import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps";
import { createOrder } from "../../redux/actions/orderActions";
import { ORDER_CREATE_RESET } from "../../redux/constants/orderConstants.js";
import LoadingBox from "../../components/boxes/LoadingBox";
import MessageBox from "../../components/boxes/MessageBox";
import "./PlaceOrder.scss";

const PlaceOrder = (props) => {
  //PULL FROM STORE
  const cart = useSelector((state) => state.cart);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  //FORMAT PRICES
  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  //SET PRICES
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.13 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  //DISPATCH PLACE ORDER
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  //ONCE ORDER IS MADE
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, success, order, props.history]);

  return (
    <section className="order">
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

      <h1 className="order__title">Order Summary</h1>

      <div className="orderContainer">
        <div className="orderCard shippingCardMobile">
          <h2 className="orderCard__title">Shipping</h2>
          <h3 className="orderCard__subtitle">NAME:</h3>
          <p className="orderCard__text">{cart.shippingAddress.fullName}</p>
          <h3 className="orderCard__subtitle">ADDRESS:</h3>
          <p className="orderCard__text">
            {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
            {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
          </p>
          <h2 className="orderCard__title">Payment</h2>

          <h3 className="orderCard__subtitle">METHOD:</h3>
          <p className="orderCard__text">{cart.paymentMethod}</p>
        </div>

        <div className="orderCard itemsCard">
          <h2 className="orderCard__title orderCard__title--underline">
            Items
          </h2>
          <ul>
            {cart.cartItems.map((item) => {
              return (
                <Link
                  to={`/product/${item.productId}`}
                  key={`${item.productId}${item.size}`}
                >
                  <li className="orderItem">
                    <div className="orderItem__imgContainer">
                      <img
                        className="orderItem__img"
                        src={item.image}
                        alt={item.name}
                      />
                    </div>
                    <div className="orderItem__detailsContainer">
                      <p className="orderItem__name">{item.name}</p>
                      {item.type !== "Apparel" ? (
                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      ) : (
                        <div>
                          {item.qty} {item.size} x ${item.price} = $
                          {item.qty * item.price}
                        </div>
                      )}
                    </div>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="rightWrap">
          <div className="orderCard shippingCard">
            <h2 className="orderCard__title">Shipping</h2>
            <h3 className="orderCard__subtitle">NAME:</h3>
            <p className="orderCard__text">{cart.shippingAddress.fullName}</p>
            <h3 className="orderCard__subtitle">ADDRESS:</h3>
            <p className="orderCard__text">
              {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
            <h2 className="orderCard__title">Payment</h2>

            <h3 className="orderCard__subtitle">METHOD:</h3>
            <p className="orderCard__text">{cart.paymentMethod}</p>
          </div>

          <div className="orderCard">
            <h2 className="orderCard__title">Summary</h2>

            <div className="orderCard__summaryRow">
              <h3 className="orderCard__subtitle">Items</h3>
              <div className="orderCard__price">
                ${cart.itemsPrice.toFixed(2)}
              </div>
            </div>

            <div className="orderCard__summaryRow">
              <h3 className="orderCard__subtitle">Shipping</h3>
              <div className="orderCard__price">
                ${cart.shippingPrice.toFixed(2)}
              </div>
            </div>

            <div className="orderCard__summaryRow">
              <h3 className="orderCard__subtitle">Tax</h3>
              <div className="orderCard__price">
                ${cart.taxPrice.toFixed(2)}
              </div>
            </div>

            <div className="orderCard__summaryRow">
              <h3 className="orderCard__subtitle orderCard__subtitle--bold">
                TOTAL
              </h3>

              <strong className="orderCard__price">
                ${cart.totalPrice.toFixed(2)}
              </strong>
            </div>

            <button
              type="button"
              onClick={placeOrderHandler}
              className="placeOrderButton"
              disabled={cart.cartItems.length === 0}
            >
              Place Order
            </button>

            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaceOrder;
