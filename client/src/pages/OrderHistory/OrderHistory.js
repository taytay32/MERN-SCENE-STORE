import React, { useEffect } from "react";
import "./OrderHistory.scss";
import { useDispatch, useSelector } from "react-redux";
import { listOrderMine } from "../../redux/actions/orderActions";
import LoadingBox from "../../components/boxes/LoadingBox";
import MessageBox from "../../components/boxes/MessageBox";

const OrderHistory = (props) => {
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;

  console.log(orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);

  return (
    <section className="orderHistory">
      <h1 className="orderHistory__title">Order History</h1>
      <div className="orderHistWrap">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger"></MessageBox>
        ) : (
          <>
            {orders &&
              orders.map((order) => (
                <div key={order._id} className="orderHistCard">
                  <div className="orderImages">
                    {order.orderItems.map((item) => {
                      return (
                        <img
                          key={`${item._id}${item.size}`}
                          src={item.image}
                          className="orderHistCard__img"
                          alt={item.image.name}
                        />
                      );
                    })}
                  </div>

                  {/* <img
                    className="orderHistCard__img"
                    src={order.orderItems[0].image}
                    alt={order.orderItems[0].name}
                  /> */}
                  <h3 className="orderHistCard__subtitle">ID</h3>
                  <p className="orderHistCard__p">{order._id}</p>
                  <h3 className="orderHistCard__subtitle">DATE</h3>
                  <p className="orderHistCard__p">
                    {order.createdAt.substring(0, 10)}
                  </p>
                  <h3 className="orderHistCard__subtitle">TOTAL</h3>
                  <p className="orderHistCard__p">${order.totalPrice}</p>
                  <h3 className="orderHistCard__subtitle">PAID</h3>
                  <p className="orderHistCard__p">
                    {order.isPaid ? order.paidOn.substring(0, 10) : "No"}
                  </p>
                  {/* <h3 className="orderHistCard__subtitle">DELIVERED</h3>
                  <p className="orderHistCard__p">
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : "No"}
                  </p> */}

                  <button
                    type="button"
                    className="detailsBtn"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                    Order Details
                  </button>
                </div>
              ))}
          </>
        )}
      </div>
    </section>
  );
};

export default OrderHistory;
