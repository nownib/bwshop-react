import {
  FETCH_PRODUCT_DETAIL_REQUEST,
  FETCH_PRODUCT_DETAIL_SUCCESS,
  FETCH_PRODUCT_DETAIL_ERROR,
} from "../action/types";

const INITIAL_STATE = {
  isLoading: false,
  productId: null,
};

const productDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        productId: action.productId,
      };

    case FETCH_PRODUCT_DETAIL_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default productDetailsReducer;
