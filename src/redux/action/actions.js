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
  ADD_PRODUCT_TO_WISHLIST_REQUEST,
  ADD_PRODUCT_TO_WISHLIST_SUCCESS,
  ADD_PRODUCT_TO_WISHLIST_ERROR,
  FETCH_ITEM_WISHLIST_REQUEST,
  FETCH_ITEM_WISHLIST_SUCCESS,
  FETCH_ITEM_WISHLIST_ERROR,
  DELETE_PRODUCT_WISHLIST_SUCCESS,
  FETCH_BLOG_REQUEST,
  FETCH_BLOG_SUCCESS,
  FETCH_BLOG_ERROR,
  FETCH_BLOG_DETAIL_REQUEST,
  FETCH_BLOG_DETAIL_SUCCESS,
  FETCH_BLOG_DETAIL_ERROR,
  UPDATE_ACCOUNT_REQUEST,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_ERROR,
  FETCH_ORDER_BY_ID_REQUEST,
  FETCH_ORDER_BY_ID_SUCCESS,
  FETCH_ORDER_BY_ID_ERROR,
  FETCH_ORDER_DETAILS_REQUEST,
  FETCH_ORDER_DETAILS_SUCCESS,
  FETCH_ORDER_DETAILS_ERROR,
  SET_ACTIVE,
  FETCH_ADDRESS_REQUEST,
  FETCH_ADDRESS_SUCCESS,
  FETCH_ADDRESS_ERROR,
} from "./types";
import { fetchAllProducts } from "../../services/productService";
import { getUserAccount, updateAccount } from "../../services/userService";
import { fetchAllBlogs } from "../../services/blogService";
import {
  addToCart,
  fetchAllItemsInCart,
  deleteProductInCart,
  updateToCart,
  clearCart,
  addOrder,
  fetchOrdersById,
  fetchOrderDetails,
} from "../../services/cartService";
import {
  addProductToWishlist,
  fetchAllItemsInWishlist,
  deleteProductInWishlist,
} from "../../services/wishlistService";
import { fetchAllAddressByUser } from "../../services/addressService";
import { toast } from "react-toastify";

export const fetchAllAddressRedux = () => {
  return async (dispatch, getState) => {
    dispatch(fetchAddressRequest());
    try {
      const response = await fetchAllAddressByUser();
      if (response && response.EC === 0) {
        dispatch(fetchAddressSuccess(response.DT));
      }
    } catch (error) {
      console.log(error);
      dispatch(fetchAddressSuccess());
    }
  };
};

export const fetchAddressRequest = () => {
  return {
    type: FETCH_ADDRESS_REQUEST,
  };
};

export const fetchAddressSuccess = (data) => {
  return {
    type: FETCH_ADDRESS_SUCCESS,
    listAddress: data,
  };
};

export const fetchAddressError = () => {
  return {
    type: FETCH_ADDRESS_ERROR,
  };
};

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
        dispatch(fetchAllItemsInWishlistRedux());
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

export const updateAccountRedux = (userData) => {
  return async (dispatch, getState) => {
    dispatch(updateAccountRequest());
    try {
      let response = await updateAccount(userData);
      if (response && response.EC === 0) {
        dispatch(updateAccountSuccess(userData));
        toast.success(response.EM);
      }
    } catch (error) {
      console.error(error);
      dispatch(updateAccountError());
    }
  };
};

export const updateAccountRequest = () => ({
  type: UPDATE_ACCOUNT_REQUEST,
});

export const updateAccountSuccess = (userData) => ({
  type: UPDATE_ACCOUNT_SUCCESS,
  userData: userData,
});

export const updateAccountError = () => ({
  type: UPDATE_ACCOUNT_ERROR,
});

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

export const fetchOrderDetailsRedux = (orderId) => {
  return async (dispatch, getState) => {
    dispatch(fetchOrderDetailsRequest());
    try {
      const response = await fetchOrderDetails(orderId);
      if (response && response.EC === 0) {
        let data = response && response.DT ? response.DT : [];
        dispatch(fetchOrderDetailsSuccess(data));
      }
    } catch (error) {
      console.log(error);
      dispatch(fetchOrderDetailsError());
    }
  };
};

export const fetchOrderDetailsRequest = () => {
  return {
    type: FETCH_ORDER_DETAILS_REQUEST,
  };
};

export const fetchOrderDetailsSuccess = (data) => {
  return {
    type: FETCH_ORDER_DETAILS_SUCCESS,
    orderItems: data,
  };
};
export const fetchOrderDetailsError = () => {
  return {
    type: FETCH_ORDER_DETAILS_ERROR,
  };
};

export const fetchOrdersByIdRedux = () => {
  return async (dispatch, getState) => {
    dispatch(fetchOrdersByIdRequest());
    try {
      const response = await fetchOrdersById();
      if (response && response.EC === 0) {
        const data = response && response.DT ? response.DT : [];
        dispatch(fetchOrdersByIdSuccess(data));
      }
    } catch (error) {
      console.log(error);
      dispatch(fetchOrdersByIdError());
    }
  };
};

export const fetchOrdersByIdRequest = () => {
  return {
    type: FETCH_ORDER_BY_ID_REQUEST,
  };
};

export const fetchOrdersByIdSuccess = (data) => {
  return {
    type: FETCH_ORDER_BY_ID_SUCCESS,
    listOrders: data,
  };
};
export const fetchOrdersByIdError = () => {
  return {
    type: FETCH_ORDER_BY_ID_ERROR,
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

export const addProductToWishlistRedux = (productId) => {
  return async (dispatch, getState) => {
    dispatch(addProductToWishlistRequest());
    try {
      let response = await addProductToWishlist(productId);
      if (response && response.EC === 0) {
        dispatch(addProductToWishlistSuccess());
        dispatch(fetchAllItemsInWishlistRedux());
        toast.success(response.EM);
      }
    } catch (error) {
      console.log(error);
      dispatch(addProductToWishlistError());
    }
  };
};

export const addProductToWishlistRequest = () => {
  return {
    type: ADD_PRODUCT_TO_WISHLIST_REQUEST,
  };
};
export const addProductToWishlistSuccess = () => {
  return {
    type: ADD_PRODUCT_TO_WISHLIST_SUCCESS,
  };
};

export const addProductToWishlistError = () => {
  return {
    type: ADD_PRODUCT_TO_WISHLIST_ERROR,
  };
};

export const fetchAllItemsInWishlistRedux = () => {
  return async (dispatch, getState) => {
    dispatch(fetchAllItemsWishlistRequest());
    try {
      const response = await fetchAllItemsInWishlist();
      if (response && response.EC === 0) {
        dispatch(fetchAllItemsWishlistSuccess(response.DT));
      }
    } catch (error) {
      console.log(error);
      dispatch(fetchAllItemsWishlistError());
    }
  };
};

export const fetchAllItemsWishlistRequest = () => {
  return {
    type: FETCH_ITEM_WISHLIST_REQUEST,
  };
};

export const fetchAllItemsWishlistSuccess = (data) => {
  return {
    type: FETCH_ITEM_WISHLIST_SUCCESS,
    listItems: data,
  };
};

export const fetchAllItemsWishlistError = () => {
  return {
    type: FETCH_ITEM_WISHLIST_ERROR,
  };
};

export const deleteProductInWishlistRedux = (productId) => {
  return async (dispatch, getState) => {
    try {
      let response = await deleteProductInWishlist(productId);
      if (response && response.EC === 0) {
        dispatch(deleteProductSuccess());
        dispatch(fetchAllItemsInWishlistRedux());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteProductWishlistSuccess = (data) => {
  return {
    type: DELETE_PRODUCT_WISHLIST_SUCCESS,
  };
};

export const fetchAllBlogsRedux = () => {
  return async (dispatch, getState) => {
    dispatch(fetchBlogsRequest());
    try {
      const response = await fetchAllBlogs();
      if (response && response.EC === 0) {
        dispatch(fetchBlogsSuccess(response.DT));
      }
    } catch (error) {
      console.log(error);
      dispatch(fetchBlogsError());
    }
  };
};

export const fetchBlogsRequest = () => {
  return {
    type: FETCH_BLOG_REQUEST,
  };
};

export const fetchBlogsSuccess = (data) => {
  return {
    type: FETCH_BLOG_SUCCESS,
    listItems: data,
  };
};

export const fetchBlogsError = () => {
  return {
    type: FETCH_BLOG_ERROR,
  };
};

export const fetchBlogDetailsRedux = (blogId) => {
  return async (dispatch, getState) => {
    dispatch(fetchBlogDetailsRequest());
    try {
      const id = blogId;
      dispatch(fetchBlogDetailsSuccess(id));
    } catch (error) {
      dispatch(fetchBlogDetailsError());
    }
  };
};

export const fetchBlogDetailsRequest = () => {
  return {
    type: FETCH_BLOG_DETAIL_REQUEST,
  };
};

export const fetchBlogDetailsSuccess = (id) => {
  return {
    type: FETCH_BLOG_DETAIL_SUCCESS,
    blogId: id,
  };
};

export const fetchBlogDetailsError = () => {
  return {
    type: FETCH_BLOG_DETAIL_ERROR,
  };
};

export const setActiveRedux = (index) => {
  return {
    type: SET_ACTIVE,
    index: index,
  };
};
