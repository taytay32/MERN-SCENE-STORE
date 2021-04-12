import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps";
import { detailsOrder, payOrder } from "../../redux/actions/orderActions";
import LoadingBox from "../../components/boxes/LoadingBox";
import MessageBox from "../../components/boxes/MessageBox";
import "../PlaceOrder/PlaceOrder.scss";
// import "./OrderDetails.scss";
import { ORDER_PAY_RESET } from "../../redux/constants/orderConstants";
import { API_URL } from "../../utils.js";

const OrderDetails = (props) => {
  const orderId = props.match.params.id;

  //STATE HOOKS
  const [sdkReady, setSdkReady] = useState(false);

  //PULL IN FROM STORE
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;

  const dispatch = useDispatch();
  //USE PAYPAL
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get(`${API_URL}/api/config/paypal`);

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };

      document.body.appendChild(script);
    };

    if (!order || successPay || (order && order._id !== orderId)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, order, sdkReady, successPay]);

  //paymentResult FROM PAYPAL
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <section className="order">
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

      <h1 className="order__title">Order Details</h1>

      <div className="orderContainer">
        <div className="orderCard shippingCardMobile">
          <h2 className="orderCard__title">Shipping</h2>
          <h3 className="orderCard__subtitle">ORDER #:</h3>
          <p className="orderCard__text">{order._id}</p>
          <h3 className="orderCard__subtitle">NAME:</h3>
          <p className="orderCard__text">{order.shippingAddress.fullName}</p>
          <h3 className="orderCard__subtitle">ADDRESS:</h3>
          <p className="orderCard__text">
            {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>
          {/* {order.isDelivered ? (
                <MessageBox variant="success">
                  Shipped on {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Shipped</MessageBox>
              )} */}

          <h2 className="orderCard__title">Payment</h2>

          <h3 className="orderCard__subtitle">METHOD:</h3>
          <p className="orderCard__text">{order.paymentMethod}</p>
          {order.isPaid ? (
            <MessageBox variant="success">
              <p> Paid on {order.paidOn.split("T")[0]}.</p>
              <p>Items will ship within 5 days.</p>
            </MessageBox>
          ) : (
            <MessageBox variant="danger">Not Paid</MessageBox>
          )}
        </div>

        <div className="orderCard">
          <h2 className="orderCard__title orderCard__title--underline">
            Items
          </h2>
          <ul>
            {order.orderItems.map((item) => {
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

                      <div>
                        {item.qty} {item.size} x ${item.price} = $
                        {item.qty * item.price}
                      </div>
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
            <h3 className="orderCard__subtitle">ORDER #:</h3>
            <p className="orderCard__text">{order._id}</p>
            <h3 className="orderCard__subtitle">NAME:</h3>
            <p className="orderCard__text">{order.shippingAddress.fullName}</p>
            <h3 className="orderCard__subtitle">ADDRESS:</h3>
            <p className="orderCard__text">
              {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
            {/* {order.isDelivered ? (
                <MessageBox variant="success">
                  Shipped on {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Shipped</MessageBox>
              )} */}

            <h2 className="orderCard__title">Payment</h2>

            <h3 className="orderCard__subtitle">METHOD:</h3>
            <p className="orderCard__text">{order.paymentMethod}</p>
            {order.isPaid ? (
              <MessageBox variant="success">
                <p> Paid on {order.paidOn.split("T")[0]}.</p>
                <p>Items will ship within 5 days.</p>
              </MessageBox>
            ) : (
              <MessageBox variant="danger">Not Paid</MessageBox>
            )}
          </div>

          <div className="orderCard">
            <h2 className="orderCard__title">Summary</h2>

            <div className="orderCard__summaryRow">
              <h3 className="orderCard__subtitle">Items</h3>
              <div className="orderCard__price">
                ${order.itemsPrice.toFixed(2)}
              </div>
            </div>

            <div className="orderCard__summaryRow">
              <h3 className="orderCard__subtitle">Shipping</h3>
              <div className="orderCard__price">
                ${order.shippingPrice.toFixed(2)}
              </div>
            </div>

            <div className="orderCard__summaryRow">
              <h3 className="orderCard__subtitle">Tax</h3>
              <div className="orderCard__price">
                ${order.taxPrice.toFixed(2)}
              </div>
            </div>

            <div className="orderCard__summaryRow">
              <h3 className="orderCard__subtitle orderCard__subtitle--bold">
                TOTAL
              </h3>

              <strong className="orderCard__price">
                ${order.totalPrice.toFixed(2)}
              </strong>
            </div>
            {order.isPaid && (
              <MessageBox variant="success">SUCCESS!</MessageBox>
            )}
            {!order.isPaid && (
              <div className="paypaldiv">
                {!sdkReady ? (
                  <LoadingBox></LoadingBox>
                ) : (
                  <>
                    {errorPay && (
                      <MessageBox variant="danger">{errorPay}</MessageBox>
                    )}
                    {loadingPay && <LoadingBox></LoadingBox>}

                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    ></PayPalButton>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
