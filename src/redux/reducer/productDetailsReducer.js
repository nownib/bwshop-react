import {
  FETCH_PRODUCT_DETAIL_REQUEST,
  FETCH_PRODUCT_DETAIL_SUCCESS,
  FETCH_PRODUCT_DETAIL_ERROR,
} from "../action/types";

const INITIAL_STATE = {
  isLoading: false,
  product: {},
  notFound: false,
};

const productDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
        notFound: false,
      };

    case FETCH_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,

        product: {
          id: action.product.id,
          name: action.product.name,
          sku: action.product.sku,
          description: action.product.description,
          price: action.product.price,
          imageUrl: action.product.imageUrl,
          category: action.product.Category.name,
          rating: action.product.rating,
          status: action.product.status,
          stock: action.product.stock,
          productionDate: action.product.productionDate,
          expirationDate: action.product.expirationDate,
        },
      };

    case FETCH_PRODUCT_DETAIL_ERROR:
      return {
        ...state,
        isLoading: false,
        notFound: true,
      };
    default:
      return state;
  }
};

export default productDetailsReducer;
