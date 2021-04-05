import React, { useState } from "react";
import logo from "../../assets/images/logos/logo-black-crop.png";
import { Link, Route } from "react-router-dom";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../redux/actions/userActions";
import menu from "../../assets/icons/burger-menu.svg";
import shoppingCart from "../../assets/icons/shopping-cart.svg";
import SearchBox from "../SearchBox/SearchBox";

const Header = () => {
  const [burger, setBurger] = useState(false);
  // const [search, setSearch] = useState("");

  // const filteredProducts = products.filter((product) => {
  //   return product.name.toLowercase().includes(search.toLowercase());
  // });

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
    setBurger(!burger);
  };

  const burgerHandler = () => {
    setBurger(!burger);
  };

  let showBurger;

  if (burger) {
    showBurger = (
      <div className="menuExpand">
        <ul className="mobileList">
          {userInfo ? (
            <>
              <li className="mobileList__item">
                <Link
                  className="mobileList__item__link"
                  to="/profile"
                  onClick={burgerHandler}
                >
                  {userInfo.firstName}'s Profile
                </Link>
              </li>
              <li className="mobileList__item">
                <Link
                  onClick={burgerHandler}
                  className="mobileList__item__link"
                  to="/orderhistory"
                >
                  Order History
                </Link>
              </li>
              <li className="mobileList__item">
                <Link
                  className="mobileList__item__link"
                  to="/signin"
                  onClick={signoutHandler}
                >
                  Sign Out
                </Link>
              </li>
            </>
          ) : (
            <li className="mobileList__item">
              <Link
                onClick={burgerHandler}
                className="mobileList__item__link"
                to="/signin"
              >
                Sign In
              </Link>
            </li>
          )}

          {userInfo && userInfo.isAdmin && (
            <>
              <li className="mobileList__item underline">Admin</li>
              <li className="mobileList__item">
                <Link
                  onClick={burgerHandler}
                  className="mobileList__item__link"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
              <li className="mobileList__item">
                <Link
                  onClick={burgerHandler}
                  className="mobileList__item__link"
                  to="/productlist"
                >
                  Products
                </Link>
              </li>
              <li className="mobileList__item">
                <Link
                  onClick={burgerHandler}
                  className="mobileList__item__link"
                  to="/orderlist"
                >
                  Orders
                </Link>
              </li>
              <li className="mobileList__item">
                <Link
                  onClick={burgerHandler}
                  className="mobileList__item__link"
                  to="/userlist"
                >
                  Users
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    );
  }

  return (
    <>
      <header className="header">
        <Link to="/" className="logo" onClick={() => setBurger(false)}>
          <img src={logo} alt="" className="logo__logo" />
          <h1 className="logo__title">.STORE</h1>
        </Link>
        <nav className="mobileNav">
          <div className="mobileNavWrap">
            <div className="mobileCartWrap">
              <Link className="mobileCartLink" to="/cart">
                <img className="cartIcon" src={shoppingCart} alt="" />
                {cartItems.length > 0 && (
                  <span className="cartBadgeMobile">{cartItems.length}</span>
                )}
              </Link>
            </div>
            <input
              className="mobileNavWrap__search"
              type="text"
              name="searchMerch"
              // value={searchTerms}
              // onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
            />
            {/* <div>
              <Route
                render={({ history }) => (
                  <SearchBox history={history}></SearchBox>
                )}
              />
            </div> */}
            <img src={menu} alt="" onClick={burgerHandler} />
          </div>
        </nav>
        <div>{showBurger}</div>

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
                <Link className="dropdown__link" to="/profile">
                  User Profile
                </Link>
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
          {userInfo && userInfo.isAdmin && (
            <div className="dropdown links__link">
              <Link className="dropdown__link" to="#admin">
                Admin <i className="fa fa-caret-down"></i>{" "}
              </Link>
              <div className="dropdown-content">
                <Link className="dropdown__link" to="/dashboard">
                  Dashboard
                </Link>
                <Link className="dropdown__link" to="/productlist">
                  Products
                </Link>
                <Link className="dropdown__link" to="/orderlist">
                  Orders
                </Link>
                <Link className="dropdown__link" to="/userlist">
                  Users
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
