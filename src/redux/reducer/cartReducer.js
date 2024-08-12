import {
  ADD_PRODUCT_TO_CART_REQUEST,
  ADD_PRODUCT_TO_CART_SUCCESS,
  ADD_PRODUCT_TO_CART_ERROR,
  FETCH_ITEM_CART_REQUEST,
  FETCH_ITEM_CART_SUCCESS,
  FETCH_ITEM_CART_ERROR,
  DELETE_PRODUCT_CART_SUCCESS,
} from "../action/types";

const INITIAL_STATE = {
  listProductsInCart: [],
  isLoading: false,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART_REQUEST:
      return { ...state, isLoading: true };
    case ADD_PRODUCT_TO_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ADD_PRODUCT_TO_CART_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    case FETCH_ITEM_CART_REQUEST:
      return { ...state, isLoading: true };

    case FETCH_ITEM_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listProductsInCart: action.listItems,
      };
    case FETCH_ITEM_CART_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default cartReducer;
