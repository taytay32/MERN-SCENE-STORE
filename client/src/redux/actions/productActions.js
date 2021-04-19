import axios from "axios";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  SELECTED_PRODUCT_FAIL,
  SELECTED_PRODUCT_REQUEST,
  SELECTED_PRODUCT_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCCESS,
} from "../constants/productConstants";
import { API_URL } from "../../utils.js";

export const listProducts = (search) => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    console.log("I am Here, line 26 of product actions");
    // const { data } = await axios.get(`${API_URL}/api/products`);
    const { data } = await axios.get(
      `https://gurth-store-app.herokuapp.com/api/products`
    );

    console.log(data, "IAM THE DATA");

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const selectedProduct = (productId) => async (dispatch) => {
  dispatch({
    type: SELECTED_PRODUCT_REQUEST,
    payload: productId,
  });
  try {
    const { data } = await axios.get(`${API_URL}/api/products/${productId}`);
    dispatch({
      type: SELECTED_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SELECTED_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  dispatch({
    type: PRODUCT_CREATE_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.post(
      `${API_URL}/api/products`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  console.log("payload ", product);
  dispatch({
    type: PRODUCT_UPDATE_REQUEST,
    payload: product,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(
      `${API_URL}/api/products/${product._id}`,
      product,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      error: message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({
    type: PRODUCT_DELETE_REQUEST,
    payload: productId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = axios.delete(`${API_URL}/api/products/${productId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: message,
    });
  }
};
