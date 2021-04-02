import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps";
import { detailsOrder } from "../../redux/actions/orderActions";
import LoadingBox from "../../components/boxes/LoadingBox";
import MessageBox from "../../components/boxes/MessageBox";
import "../PlaceOrder/PlaceOrder.scss";

const OrderDetails = (props) => {
  const orderId = props.match.params.id;
  // const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  // const orderPay = useSelector((state) => state.orderPay);
  // const {
  //   loading: loadingPay,
  //   error: errorPay,
  //   success: successPay,
  // } = orderPay;

  const dispatch = useDispatch();

  useEffect(() => {
    //   const addPayPalScript = async () => {
    //     const { data } = await axios.get("/api/config/paypal");

    //     const script = document.createElement("script");
    //     script.type = "text/javascript";
    //     script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    //     script.async = true;
    //     script.onload = () => {
    //       setSdkReady(true);
    //     };

    //     document.body.appendChild(script);
    //   };

    //   if (!order || successPay || (order && order._id !== orderId)) {
    //     dispatch({ type: ORDER_PAY_RESET });
    dispatch(detailsOrder(orderId));
    //   } else {
    //     if (!order.isPaid) {
    //       if (!window.paypal) {
    //         addPayPalScript();
    //       } else {
    //         setSdkReady(true);
    //       }
    //     }
    //   }
  }, [dispatch, orderId]);

  // const successPaymentHandler = (paymentResult) => {
  //   dispatch(payOrder(order, paymentResult));
  // };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <section className="placeOrder">
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

      <h1 className="placeOrder__title">Order Details</h1>

      <div className="border">
        <ul>
          <li>
            <div className="orderCard">
              <h2 className="orderCard__title">Shipping</h2>
              <h3 className="orderCard__subtitle">ORDER#:</h3>
              <p className="orderCard__p">{order._id}</p>
              <h3 className="orderCard__subtitle">NAME:</h3>
              <p className="orderCard__p">{order.shippingAddress.fullName}</p>
              <h3 className="orderCard__subtitle">ADDRESS:</h3>
              <p className="orderCard__p">
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <MessageBox variant="success">
                  Delivered at {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Delivered</MessageBox>
              )}
              <h2 className="orderCard__title">Payment</h2>

              <h3 className="orderCard__subtitle">METHOD:</h3>
              <p className="orderCard__p">{order.paymentMethod}</p>
              {order.isPaid ? (
                <MessageBox variant="success">
                  Paid at {order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Paid</MessageBox>
              )}
            </div>
          </li>

          <li>
            <div className="orderCard">
              <h2 className="orderCard__title item__title">Items</h2>
              <ul>
                {order.orderItems.map((item) => {
                  return (
                    <Link
                      to={`/product/${item.productId}`}
                      key={`${item.productId}${item.size}`}
                    >
                      <li className="orderItem">
                        <div className="imgWrap">
                          <img
                            className="imgWrap__img"
                            src={item.image}
                            alt={item.name}
                          />
                        </div>
                        <div className="orderDetailsWrap">
                          <p className="orderDetailsWrap__name">{item.name}</p>

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
          </li>
        </ul>

        <div className="orderCard">
          <h2 className="orderCard__title">Summary</h2>

          <div className="row">
            <h3 className="orderCard__subtitle">Items</h3>
            <div className="orderCard__price">
              ${order.itemsPrice.toFixed(2)}
            </div>
          </div>

          <div className="row">
            <h3 className="orderCard__subtitle">Shipping</h3>
            <div className="orderCard__price">
              ${order.shippingPrice.toFixed(2)}
            </div>
          </div>

          <div className="row">
            <h3 className="orderCard__subtitle">Tax</h3>
            <div className="orderCard__price">${order.taxPrice.toFixed(2)}</div>
          </div>

          <div className="row">
            <h3 className="orderCard__subtitle bold">TOTAL</h3>

            <strong className="orderCard__price">
              ${order.totalPrice.toFixed(2)}
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
