import {
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_ERROR,
} from "../action/types";

const INITIAL_STATE = {
  isLoading: false,
  orderDetails: [],
};

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADD_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
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

export default orderReducer;
