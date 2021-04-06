import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./SignIn.scss";
import { signin } from "../../redux/actions/userActions";
import LoadingBox from "../../components/boxes/LoadingBox";
import MessageBox from "../../components/boxes/MessageBox";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("?")[1]
    : "/";

  // const cart = useSelector((state) => state.cart);
  // const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, props.history, redirect]);

  return (
    <section className="signin">
      <form className="submit" action="submit" onSubmit={submitHandler}>
        <h1 className="submit__title">Sign In</h1>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div className="inputs">
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
        </div>

        <button className="signinbutton" type="submit">
          Sign In
        </button>

        <div className="redirect">
          <p className="redirect__p">New customer?</p>
          <Link
            className="redirect__link"
            to={`/register?redirect=${redirect}`}
          >
            Create Account
          </Link>
        </div>
      </form>
    </section>
  );
};

export default SignIn;
