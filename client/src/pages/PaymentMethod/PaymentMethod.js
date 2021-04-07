import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../redux/actions/cartActions";
import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps.js";
import "./PaymentMethod.scss";

const PaymentMethod = (props) => {
  //PULL FROM STORE
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }

  //STATE HOOKS
  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    if (paymentMethod.length > 1) {
      dispatch(savePaymentMethod(paymentMethod));
      props.history.push("/placeorder");
    } else {
      alert("Please choose a payment method");
    }
  };

  return (
    <section className="paymentMethod">
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form action="" className="form" onSubmit={submitHandler}>
        <h1 className="form__title">Payment Method</h1>
        <div className="methods">
          <div className="optionsWrap">
            <div className="checkWrap">
              <label className="check" htmlFor="paypal">
                PayPal
              </label>
              <input
                type="radio"
                id="paypal"
                value="PayPal"
                name="paymentMethod"
                required
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </div>
            <div className="checkWrap">
              <label className="check" htmlFor="stripe">
                Stripe
              </label>
              <input
                className="radio"
                type="radio"
                id="stripe"
                value="Stripe"
                name="paymentMethod"
                required
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </div>
          </div>
          <div className="paymentbtn">
            <button className="paymentbtn__button" type="submit">
              Continue
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default PaymentMethod;
