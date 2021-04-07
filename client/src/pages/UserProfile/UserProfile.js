import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import "../Register/Register.scss";
import {
  detailsUser,
  updateUserProfile,
} from "../../redux/actions/userActions";
import LoadingBox from "../../components/boxes/LoadingBox";
import MessageBox from "../../components/boxes/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../../redux/constants/userConstants";

const UserProfile = (props) => {
  //STATE HOOKS
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //PULL FROM STORE
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  //
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password do not match");
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          firstName,
          lastName,
          email,
          password,
        })
      );
    }
  };

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    }
    setFirstName(userInfo.firstName);
    setLastName(userInfo.lastName);
    setEmail(userInfo.email);
  }, [
    userInfo._id,
    dispatch,
    user,
    userInfo.firstName,
    userInfo.lastName,
    userInfo.email,
  ]);

  return (
    <section className="register">
      <form className="submit" action="submit" onSubmit={submitHandler}>
        <h1 className="submit__title">User Profile</h1>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Profile Updated Successfully
              </MessageBox>
            )}
            <div className="inputs">
              <label className="inputs__label" htmlFor="firstName">
                First Name
              </label>
              <input
                className="inputs__input"
                type="text"
                id="firstName"
                placeholder="Enter first name"
                value={firstName}
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
                value={lastName}
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
                value={email}
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
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button className="registerButton" type="submit">
              Update
            </button>
          </>
        )}
      </form>
    </section>
  );
};

export default UserProfile;
