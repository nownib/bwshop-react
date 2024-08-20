import {
  INCREMENT,
  DECREMENT,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_ERROR,
  FETCH_PRODUCT_DETAIL_REQUEST,
  FETCH_PRODUCT_DETAIL_SUCCESS,
  FETCH_PRODUCT_DETAIL_ERROR,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERORR,
  LOGIN,
  LOGOUT,
  ADD_PRODUCT_TO_CART_REQUEST,
  ADD_PRODUCT_TO_CART_SUCCESS,
  ADD_PRODUCT_TO_CART_ERROR,
  FETCH_ITEM_CART_REQUEST,
  FETCH_ITEM_CART_SUCCESS,
  FETCH_ITEM_CART_ERROR,
  DELETE_PRODUCT_CART_SUCCESS,
  UPDATE_PRODUCT_CART_REQUEST,
  UPDATE_PRODUCT_CART_SUCCESS,
  UPDATE_PRODUCT_CART_ERROR,
  DELETE_ALL_PRODUCT_CART_SUCCESS,
  DEFAULT_CART,
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_ERROR,
} from "./types";
import { fetchAllProducts } from "../../services/productService";
import { getUserAccount } from "../../services/userService";
import {
  addToCart,
  fetchAllItemsInCart,
  deleteProductInCart,
  updateToCart,
  clearCart,
  addOrder,
} from "../../services/cartService";
import { toast } from "react-toastify";

export const fetchAllItemsInCartRedux = () => {
  return async (dispatch, getState) => {
    dispatch(fetchAllItemsCartRequest());
    try {
      const response = await fetchAllItemsInCart();
      if (response && response.EC === 0) {
        dispatch(fetchAllItemsCartSuccess(response.DT));
      }
    } catch (error) {
      console.log(error);
      dispatch(fetchAllItemsCartError());
    }
  };
};

export const fetchAllItemsCartRequest = () => {
  return {
    type: FETCH_ITEM_CART_REQUEST,
  };
};

export const fetchAllItemsCartSuccess = (data) => {
  return {
    type: FETCH_ITEM_CART_SUCCESS,
    listItems: data,
  };
};

export const fetchAllItemsCartError = () => {
  return {
    type: FETCH_ITEM_CART_ERROR,
  };
};

export const addProductToCartRedux = (productId, quantity) => {
  return async (dispatch, getState) => {
    dispatch(addProductToCartRequest());
    try {
      let response = await addToCart(productId, quantity);
      if (response && response.EC === 0) {
        dispatch(addProductToCartSuccess());
        dispatch(fetchAllItemsInCartRedux());
        toast.success(response.EM);
      } else {
        toast.error(response.EM);
      }
    } catch (error) {
      console.log(error);
      dispatch(addProductToCartError());
    }
  };
};
export const addProductToCartRequest = () => {
  return {
    type: ADD_PRODUCT_TO_CART_REQUEST,
  };
};
export const addProductToCartSuccess = () => {
  return {
    type: ADD_PRODUCT_TO_CART_SUCCESS,
  };
};

export const addProductToCartError = () => {
  return {
    type: ADD_PRODUCT_TO_CART_ERROR,
  };
};

export const updateProductInCartsRedux = (productId, quantity) => {
  return async (dispatch, getState) => {
    dispatch(updateProductInCartRequest());
    try {
      let response = await updateToCart(productId, quantity);
      if (response && response.EC === 0) {
        dispatch(updateProductInCartSuccess());
        dispatch(fetchAllItemsInCartRedux());
      }
    } catch (error) {
      console.error(error);
      dispatch(updateProductInCartError());
    }
  };
};

export const updateProductInCartRequest = () => ({
  type: UPDATE_PRODUCT_CART_REQUEST,
});

export const updateProductInCartSuccess = () => ({
  type: UPDATE_PRODUCT_CART_SUCCESS,
});

export const updateProductInCartError = () => ({
  type: UPDATE_PRODUCT_CART_ERROR,
});

export const clearCartRedux = () => {
  return async (dispatch, getState) => {
    try {
      let response = await clearCart();
      if (response && response.EC === 0) {
        dispatch(clearCartSuccess());
        dispatch(fetchAllItemsInCartRedux());
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const clearCartSuccess = () => {
  return {
    type: DELETE_ALL_PRODUCT_CART_SUCCESS,
  };
};

export const deleteProductInCartRedux = (id) => {
  return async (dispatch, getState) => {
    try {
      let response = await deleteProductInCart(id);
      if (response && response.EC === 0) {
        dispatch(deleteProductSuccess());
        dispatch(fetchAllItemsInCartRedux());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteProductSuccess = () => {
  return {
    type: DELETE_PRODUCT_CART_SUCCESS,
  };
};

export const fetchUserRedux = () => {
  return async (dispatch, getState) => {
    dispatch(fetchUserRequest);
    try {
      const response = await getUserAccount();
      if (response && response.EC === 0) {
        const data = response.DT;
        dispatch(fetchUserSuccess(data));
        dispatch(fetchAllItemsInCartRedux());
      } else {
        dispatch(logoutRedux());
      }
    } catch (error) {}
  };
};

export const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

export const fetchUserSuccess = (data) => {
  return {
    type: FETCH_USER_SUCCESS,
    userData: data,
  };
};
export const fetchUserErorr = () => {
  return {
    type: FETCH_USER_ERORR,
  };
};

// export const login = (data) => ({
//   type: LOGIN,
//   userData: data,
// });

export const logoutSuccess = () => ({
  type: LOGOUT,
});

export const defaultNavbar = () => ({
  type: DEFAULT_CART,
});

export const logoutRedux = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(logoutSuccess());
      dispatch(defaultNavbar());
    } catch (error) {
      console.log(error);
    }
  };
};

export const loginSuccess = (data) => ({
  type: LOGIN,
  userData: data,
});
export const loginRedux = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loginSuccess(data));
      dispatch(fetchUserRedux());
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchAllProductsRedux = () => {
  return async (dispatch, getState) => {
    dispatch(fetchProductsRequest());
    try {
      const response = await fetchAllProducts();
      if (response && response.EC === 0) {
        const data = response && response.DT ? response.DT : [];
        dispatch(fetchProductsSuccess(data));
      }
    } catch (error) {
      console.log(error);
      dispatch(fetchProductsError());
    }
  };
};

export const fetchProductsRequest = () => {
  return {
    type: FETCH_PRODUCT_REQUEST,
  };
};

export const fetchProductsSuccess = (data) => {
  return {
    type: FETCH_PRODUCT_SUCCESS,
    listProducts: data,
  };
};

export const fetchProductsError = () => {
  return {
    type: FETCH_PRODUCT_ERROR,
  };
};

export const fetchProductDetailsRedux = (productId) => {
  return async (dispatch, getState) => {
    dispatch(fetchProductDetailsRequest());
    try {
      const id = productId;
      dispatch(fetchProductDetailsSuccess(id));
    } catch (error) {
      dispatch(fetchProductDetailsError());
    }
  };
};

export const fetchProductDetailsRequest = () => {
  return {
    type: FETCH_PRODUCT_DETAIL_REQUEST,
  };
};

export const fetchProductDetailsSuccess = (id) => {
  return {
    type: FETCH_PRODUCT_DETAIL_SUCCESS,
    productId: id,
  };
};

export const fetchProductDetailsError = () => {
  return {
    type: FETCH_PRODUCT_DETAIL_ERROR,
  };
};

export const increaseCounter = () => {
  return {
    type: INCREMENT, //name
  };
};

export const addOrderRedux = (data) => {
  return async (dispatch, getState) => {
    dispatch(addOrderRequest());
    try {
      let response = await addOrder(data);
      if (response && response.EC === 0) {
        dispatch(addOrderSuccess());
        dispatch(clearCartRedux());
        toast.success(response.EM);
      }
    } catch (error) {
      console.log(error);
      dispatch(addOrderError());
    }
  };
};
export const addOrderRequest = () => {
  return {
    type: ADD_ORDER_REQUEST,
  };
};
export const addOrderSuccess = () => {
  return {
    type: ADD_ORDER_SUCCESS,
  };
};

export const addOrderError = () => {
  return {
    type: ADD_ORDER_ERROR,
  };
};
