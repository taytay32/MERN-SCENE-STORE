import React from "react";
import logo from "../../assets/images/logos/logo-black-crop.png";
import { Link } from "react-router-dom";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../redux/actions/userActions";

const Header = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={logo} alt="" className="logo__logo" />
        <h1 className="logo__title">.STORE</h1>
      </Link>
      <div className="links">
        <Link className="links__link" to="/cart">
          Cart
          {cartItems.length > 0 && (
            <span className="cartBadge">{cartItems.length}</span>
          )}
        </Link>
        {userInfo ? (
          <div className="dropdown links__link">
            <Link className="dropdown__link" to="#">
              {userInfo.firstName} <i className="fa fa-caret-down"></i>{" "}
            </Link>
            <div className="dropdown-content">
              <Link className="dropdown__link" to="/orderhistory">
                Order History
              </Link>
              <Link
                className="dropdown__link"
                to="/signin"
                onClick={signoutHandler}
              >
                Sign Out
              </Link>
            </div>
          </div>
        ) : (
          <Link className="links__link" to="/signin">
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
