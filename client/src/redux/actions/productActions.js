import axios from "axios";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  SELECTED_PRODUCT_FAIL,
  SELECTED_PRODUCT_REQUEST,
  SELECTED_PRODUCT_SUCCESS,
} from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await axios.get("http://localhost:5000/api/products");
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
    const { data } = await axios.get(
      `http://localhost:5000/api/products/${productId}`
    );
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
