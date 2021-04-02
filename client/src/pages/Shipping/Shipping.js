import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Shipping.scss";
import { saveShippingAddress } from "../../redux/actions/cartActions.js";
import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps.js";

const Shipping = (props) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!userInfo) {
    props.history.push("/signin");
  }

  const [fullName, setFullName] = useState(
    shippingAddress.fullName ? shippingAddress.fullName : ""
  );
  const [address, setAddress] = useState(
    shippingAddress.address ? shippingAddress.address : ""
  );
  const [city, setCity] = useState(
    shippingAddress.city ? shippingAddress.city : ""
  );
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode ? shippingAddress.postalCode : ""
  );
  const [country, setCountry] = useState(
    shippingAddress.country ? shippingAddress.country : ""
  );

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    props.history.push("/payment");
  };

  return (
    <section className="shipping">
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="submit" action="submit" onSubmit={submitHandler}>
        <h1 className="submit__title">Shipping Address</h1>

        <div className="inputs">
          <label className="inputs__label" htmlFor="firstName">
            Full Name
          </label>
          <input
            className="inputs__input"
            type="text"
            id="fullName"
            placeholder="Enter full name"
            value={fullName}
            required
            onChange={(e) => setFullName(e.target.value)}
          />
          <label className="inputs__label" htmlFor="lastName">
            Address
          </label>
          <input
            className="inputs__input"
            type="text"
            id="address"
            placeholder="Enter shipping address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
          <label className="inputs__label" htmlFor="email">
            City
          </label>
          <input
            className="inputs__input"
            type="text"
            id="city"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />

          <label className="inputs__label" htmlFor="password">
            Postal Code
          </label>
          <input
            className="inputs__input"
            type="text"
            id="postalCode"
            placeholder="Enter postal code"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          />

          <label className="inputs__label" htmlFor="confirmPassword">
            Country
          </label>
          <input
            className="inputs__input"
            type="text"
            id="country"
            placeholder="Enter country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <button className="registerButton" type="submit">
          Continue
        </button>
      </form>
    </section>
  );
};

export default Shipping;
