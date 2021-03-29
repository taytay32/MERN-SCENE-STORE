import React from "react";
import logo from "../../assets/images/logos/logo-black-crop.png";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={logo} alt="" className="logo__logo" />
        <h1 className="logo__title">.STORE</h1>
      </Link>
      <div className="links">
        <div className="links__wrap">
          <Link className="links__wrap__link" to="/cart">
            Cart
          </Link>
        </div>
        <div className="links__wrap">
          <Link className="links__wrap__link" to="/signin">
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
