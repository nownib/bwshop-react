import {
  FETCH_ORDER_BY_ID_REQUEST,
  FETCH_ORDER_BY_ID_SUCCESS,
  FETCH_ORDER_BY_ID_ERROR,
  FETCH_ORDER_DETAILS_REQUEST,
  FETCH_ORDER_DETAILS_SUCCESS,
  FETCH_ORDER_DETAILS_ERROR,
} from "../action/types";

const INITIAL_STATE = {
  isLoading: false,
  listOrders: [],
  orderDetails: [],
};

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ORDER_BY_ID_REQUEST:
      return { ...state, isLoading: true };

    case FETCH_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listOrders: action.listOrders,
      };
    case FETCH_ORDER_BY_ID_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    case FETCH_ORDER_DETAILS_REQUEST:
      return { ...state, isLoading: true };

    case FETCH_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orderDetails: action.orderItems,
      };
    case FETCH_ORDER_DETAILS_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default orderReducer;
