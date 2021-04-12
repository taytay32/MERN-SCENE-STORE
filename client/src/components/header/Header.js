import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logos/logo-black-crop.png";
import { Link } from "react-router-dom";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../redux/actions/userActions";
import menu from "../../assets/icons/burger-menu.svg";
import shoppingCart from "../../assets/icons/shopping-cart.svg";
import { searchAction } from "../../redux/reducers/searchReducer";

const Header = () => {
  const [burger, setBurger] = useState(false);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchAction(search));
  }, [search, dispatch]);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const signoutHandler = () => {
    dispatch(signout());
    setBurger(false);
  };

  const burgerHandler = () => {
    setBurger(!burger);
  };

  //MOBILE MENU
  let showBurger;
  if (burger) {
    showBurger = (
      <div className="burger">
        <ul className="burger__list">
          {userInfo ? (
            <>
              <li className="burger__listItem">
                <Link
                  className="burger__link"
                  to="/profile"
                  onClick={burgerHandler}
                >
                  {userInfo.firstName}'s Profile
                </Link>
              </li>
              <li className="burger__listItem">
                <Link
                  onClick={burgerHandler}
                  className="burger__link"
                  to="/orderhistory"
                >
                  Order History
                </Link>
              </li>
              <li className="burger__listItem">
                <Link
                  className="burger__link"
                  to="/signin"
                  onClick={signoutHandler}
                >
                  Sign Out
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="burger__listItem">
                <Link
                  onClick={burgerHandler}
                  className="burger__link"
                  to="/signin"
                >
                  Sign In
                </Link>
              </li>
              <li className="burger__listItem">
                <Link
                  onClick={burgerHandler}
                  className="burger__link"
                  to="/register"
                >
                  Register
                </Link>
              </li>
            </>
          )}

          {userInfo && userInfo.isAdmin && (
            <>
              <li className="burger__listItem burger__listItem--underline">
                Admin
              </li>
              {/* <li className="burger__listItem">
                <Link
                  onClick={burgerHandler}
                  className="burger__link"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li> */}
              <li className="burger__listItem">
                <Link
                  onClick={burgerHandler}
                  className="burger__link"
                  to="/productlist"
                >
                  Products
                </Link>
              </li>
              {/* <li className="burger__listItem">
                <Link
                  onClick={burgerHandler}
                  className="burger__link"
                  to="/orderlist"
                >
                  Orders
                </Link>
              </li>
              <li className="burger__listItem">
                <Link
                  onClick={burgerHandler}
                  className="burger__link"
                  to="/userlist"
                >
                  Users
                </Link>
              </li> */}
            </>
          )}
        </ul>
      </div>
    );
  }

  return (
    <>
      <header className="header">
        <Link to="/" className="header__logo" onClick={() => setBurger(false)}>
          <img src={logo} alt="" className="header__logoImg" />
          <h1 className="header__title">.STORE</h1>
        </Link>
        <nav className="navMobile">
          <div className="navMobile__container">
            <div className="navMobile__cartContainer">
              <Link
                className="navMobile__cartLink"
                to="/cart"
                onClick={() => setBurger(false)}
              >
                <img
                  className="navMobile__cartIcon"
                  src={shoppingCart}
                  alt=""
                />
                {cartItems.length > 0 && (
                  <span className="navMobile__cartBadge">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>
            <input
              className="navMobile__search"
              type="text"
              name="searchMerch"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
            />
            <img src={menu} alt="" onClick={burgerHandler} />
          </div>
        </nav>
        <div>{showBurger}</div>

        <nav className="navDesktop">
          <div className="navDesktop__container">
            <div className="navDesktop__cartContainer">
              <Link className="navDesktop__cartLink" to="/cart">
                <img
                  className="navDesktop__cartIcon"
                  src={shoppingCart}
                  alt=""
                />
                {cartItems.length > 0 && (
                  <span className="navDesktop__cartBadge">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>
            <input
              className="navDesktop__search"
              type="text"
              name="searchMerch"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
            />
            <div className="navDesktop__dropdownsContainer">
              {userInfo ? (
                <div className="navDesktop__dropdown">
                  <Link className="navDesktop__link" to="#">
                    {userInfo.firstName} <i className="fa fa-caret-down"></i>{" "}
                  </Link>
                  <div className="navDesktop__dropdownContent">
                    <Link className="navDesktop__dropdownLink" to="/profile">
                      User Profile
                    </Link>
                    <Link
                      className="navDesktop__dropdownLink"
                      to="/orderhistory"
                    >
                      Order History
                    </Link>
                    <Link
                      className="navDesktop__dropdownLink"
                      to="/signin"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <Link className="navDesktop__link signInLink" to="/register">
                    Register
                  </Link>
                  <Link className="navDesktop__link signInLink" to="/signin">
                    Sign In
                  </Link>
                </>
              )}
              {userInfo && userInfo.isAdmin && (
                <div className="navDesktop__dropdown dropdown-2">
                  <Link className="navDesktop__link" to="#admin">
                    Admin <i className="fa fa-caret-down"></i>{" "}
                  </Link>
                  <div className="navDesktop__dropdownContent">
                    <Link className="navDesktop__dropdownLink" to="/dashboard">
                      Dashboard
                    </Link>
                    <Link
                      className="navDesktop__dropdownLink"
                      to="/productlist"
                    >
                      Products
                    </Link>
                    <Link className="navDesktop__dropdownLink" to="/orderlist">
                      Orders
                    </Link>
                    <Link className="navDesktop__dropdownLink" to="/userlist">
                      Users
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
