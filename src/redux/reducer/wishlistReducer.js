import {
  ADD_PRODUCT_TO_WISHLIST_REQUEST,
  ADD_PRODUCT_TO_WISHLIST_SUCCESS,
  ADD_PRODUCT_TO_WISHLIST_ERROR,
  FETCH_ITEM_WISHLIST_REQUEST,
  FETCH_ITEM_WISHLIST_SUCCESS,
  FETCH_ITEM_WISHLIST_ERROR,
  DEFAULT_CART,
} from "../action/types";

const INITIAL_STATE = {
  listProductsInWishlist: [],
  isLoading: false,
};

const wishlistReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_WISHLIST_REQUEST:
      return { ...state, isLoading: true };
    case ADD_PRODUCT_TO_WISHLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ADD_PRODUCT_TO_WISHLIST_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_ITEM_WISHLIST_REQUEST:
      return { ...state, isLoading: true };

    case FETCH_ITEM_WISHLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listProductsInWishlist: action.listItems,
      };
    case FETCH_ITEM_WISHLIST_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    case DEFAULT_CART:
      return {
        ...state,
        listProductsInWishlist: [],
        isLoading: false,
      };

    default:
      return state;
  }
};

export default wishlistReducer;
