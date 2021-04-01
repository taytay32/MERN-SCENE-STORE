import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  //   CART_EMPTY,
  //   CART_REMOVE_ITEM,
  //   CART_SAVE_PAYMENT_METHOD,
  //   CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const addedItem = action.payload;
      const existItem = state.cartItems.find(
        (x) => x.productId === addedItem.productId && x.size === addedItem.size
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.productId === existItem.productId &&
            item.size === existItem.size
              ? addedItem
              : item
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, addedItem] };
      }
    case CART_REMOVE_ITEM:
      console.log("string ", state.cartItems);

      return {
        ...state,

        cartItems: state.cartItems.filter((item) => {
          if (item.productId === action.payload.productId) {
            if (item.size === action.payload.size) {
              return false;
            }
          }
          return true;
        }),
      };
    // case CART_SAVE_SHIPPING_ADDRESS:
    //   return {
    //     ...state,
    //     shippingAddress: action.payload,
    //   };
    // case CART_SAVE_PAYMENT_METHOD:
    //   return {
    //     ...state,
    //     paymentMethod: action.payload,
    //   };
    // case CART_EMPTY:
    //   return { ...state, cartItems: [] };

    default:
      return state;
  }
};
