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
  LOGIN,
  LOGOUT,
  ADD_PRODUCT_TO_CART_REQUEST,
  ADD_PRODUCT_TO_CART_SUCCESS,
  ADD_PRODUCT_TO_CART_ERROR,
  FETCH_ITEM_CART_REQUEST,
  FETCH_ITEM_CART_SUCCESS,
  FETCH_ITEM_CART_ERROR,
  DELETE_PRODUCT_CART_SUCCESS,
} from "./types";
import { fetchAllProducts } from "../../services/productService";
import { getUserAccount } from "../../services/userService";
import {
  addToCart,
  fetchAllItemsInCart,
  deleteProductInCart,
} from "../../services/cartService";
import { toast } from "react-toastify";

export const fetchAllItemsInCartRedux = () => {
  return async (dispatch, getState) => {
    dispatch(fetchAllItemsCartRequest());
    try {
      const response = await fetchAllItemsInCart();
      if (response && response.EC === 0) {
        const data = response && response.DT ? response.DT : [];
        dispatch(fetchAllItemsCartSuccess(data));
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

export const addProductTocartRedux = (productId, quantity) => {
  return async (dispatch, getState) => {
    dispatch(addProductToCartRequest());
    try {
      let response = await addToCart(productId, quantity);
      if (response && response.EC === 0) {
        dispatch(addProductToCartSuccess());
        dispatch(fetchAllItemsInCartRedux());
        toast.success(response.EM);
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

export const fetchUserRedux = () => {
  return async (dispatch, getState) => {
    dispatch(fetchUserRequest);
    try {
      const response = await getUserAccount();
      if (response && response.EC === 0) {
        const data = response.DT;
        dispatch(fetchUserSuccess(data));
        dispatch(fetchAllItemsInCartRedux());
      }
    } catch (error) {
      dispatch(logout());
    }
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

// Action creator để login
export const login = (data) => ({
  type: LOGIN,
  userData: data,
});

// Action creator để logout
export const logout = () => ({
  type: LOGOUT,
});

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

export const deleteProductInCartRedux = (id) => {
  return async (dispatch, getState) => {
    try {
      let response = await deleteProductInCart(id);
      if (response && response.EC === 0) {
        dispatch(deleteUserSuccess());
        dispatch(fetchAllItemsInCartRedux());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUserSuccess = () => {
  return {
    type: DELETE_PRODUCT_CART_SUCCESS,
  };
};
