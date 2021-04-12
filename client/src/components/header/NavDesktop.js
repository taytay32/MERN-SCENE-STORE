import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import shoppingCart from "../../assets/icons/shopping-cart.svg";
import { useDispatch, useSelector } from "react-redux";
import { searchAction } from "../../redux/reducers/searchReducer";
import { signout } from "../../redux/actions/userActions";
import "./Header.scss";

const NavDesktop = () => {
  const [search, setSearch] = useState("");

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchAction(search));
  }, [search, dispatch]);

  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <nav className="navDesktop">
      <div className="navDesktop__container">
        <div className="navDesktop__cartContainer">
          <Link className="navDesktop__cartLink" to="/cart">
            <img className="navDesktop__cartIcon" src={shoppingCart} alt="" />
            {cartItems.length > 0 && (
              <span className="navDesktop__cartBadge">{cartItems.length}</span>
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
                <Link className="navDesktop__dropdownLink" to="/orderhistory">
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
                <Link className="navDesktop__dropdownLink" to="/productlist">
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
  );
};

export default NavDesktop;
