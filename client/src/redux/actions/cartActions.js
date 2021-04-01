import axios from "axios";

import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const addToCart = (productId, qty, size) => async (
  dispatch,
  getState
) => {
  const { data } = await axios.get(
    `http://localhost:5000/api/products/${productId}`
  );

  console.log(data.type);
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
