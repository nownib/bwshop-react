import ProductDetails from "../../components/Product/Product";
import {
  FETCH_PRODUCT_ERROR,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_DETAIL_REQUEST,
  FETCH_PRODUCT_DETAIL_SUCCESS,
  FETCH_PRODUCT_DETAIL_ERROR,
} from "../action/types";

const INITIAL_STATE = {
  listProducts: [],
  isLoading: false,
  isError: false,
  isCreating: false,
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        listProducts: action.listProducts,
        isLoading: false,
        isError: false,
      };

    case FETCH_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case FETCH_PRODUCT_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case FETCH_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        productDetails: action.productDetails,
        isLoading: false,
        isError: false,
      };

    case FETCH_PRODUCT_DETAIL_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default productReducer;
