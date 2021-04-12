import axios from "axios";
import { API_URL } from "../../utils.js";

import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const addToCart = (productId, qty, size, sizesOb) => async (
  dispatch,
  getState
) => {
  const { data } = await axios.get(`${API_URL}/api/products/${productId}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      productId: data._id,
      type: data.type,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      sizes: data.sizes,
      sizesOb: sizesOb,
      qty,
      size,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId, size) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: { productId, size },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
