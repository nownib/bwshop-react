import {
  ADD_PRODUCT_TO_CART_REQUEST,
  ADD_PRODUCT_TO_CART_SUCCESS,
  ADD_PRODUCT_TO_CART_ERROR,
  FETCH_ITEM_CART_REQUEST,
  FETCH_ITEM_CART_SUCCESS,
  FETCH_ITEM_CART_ERROR,
  UPDATE_PRODUCT_CART_REQUEST,
  UPDATE_PRODUCT_CART_SUCCESS,
  UPDATE_PRODUCT_CART_ERROR,
  DEFAULT_CART,
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_ERROR,
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
    case UPDATE_PRODUCT_CART_REQUEST:
      return { ...state, isLoading: true };
    case UPDATE_PRODUCT_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case UPDATE_PRODUCT_CART_ERROR:
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

    case DEFAULT_CART:
      return {
        ...state,
        listProductsInCart: [],
        isLoading: false,
      };
    case ADD_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADD_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listProductsInCart: [],
      };

    case ADD_ORDER_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default cartReducer;
