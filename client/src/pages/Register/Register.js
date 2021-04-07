import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Register.scss";
import { register } from "../../redux/actions/userActions";
import LoadingBox from "../../components/boxes/LoadingBox";
import MessageBox from "../../components/boxes/MessageBox";

const Register = (props) => {
  //STATE HOOKS
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //PULL IN FROM STORE
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const redirect = props.location.search
    ? props.location.search.split("?")[1]
    : "/";

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password do not match");
    } else {
      dispatch(register(firstName, lastName, email, password));
    }

    if (cartItems.length > 0) {
      props.history.push("/cart");
    }
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, props.history, redirect]);

  return (
    <section className="register">
      <form className="submit" action="submit" onSubmit={submitHandler}>
        <h1 className="submit__title">Create Account</h1>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div className="inputs">
          <label className="inputs__label" htmlFor="firstName">
            First Name
          </label>
          <input
            className="inputs__input"
            type="text"
            id="firstName"
            placeholder="Enter first name"
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label className="inputs__label" htmlFor="lastName">
            Last Name
          </label>
          <input
            className="inputs__input"
            type="text"
            id="lastName"
            placeholder="Enter last name"
            required
            onChange={(e) => setLastName(e.target.value)}
          />
          <label className="inputs__label" htmlFor="email">
            Email Address
          </label>
          <input
            className="inputs__input"
            type="email"
            id="email"
            placeholder="Enter email address"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="inputs__label" htmlFor="password">
            Password
          </label>
          <input
            className="inputs__input"
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className="inputs__label" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="inputs__input"
            type="password"
            id="confirmPassword"
            placeholder="Confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button className="registerButton" type="submit">
          Register
        </button>

        <div className="redirect">
          <p className="redirect__p">Already registered?</p>
          <Link className="redirect__link" to={`/signin?redirect=${redirect}`}>
            Sign In
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Register;
