import {
  SELECTED_PRODUCT_FAIL,
  SELECTED_PRODUCT_REQUEST,
  SELECTED_PRODUCT_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

//products: action.payload = data from backend
//error: action.payload = error.message
//return object gets sent to store, can be called in front end by useSelector
export const productListReducer = (
  state = {
    loading: true,
    products: [],
  },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const selectedProductReducer = (
  state = { product: {}, loading: true },
  action
) => {
  switch (action.type) {
    case SELECTED_PRODUCT_REQUEST:
      return { loading: true };
    case SELECTED_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload };
    case SELECTED_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
