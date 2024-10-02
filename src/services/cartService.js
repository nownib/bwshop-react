import axios from "../setup/axios";

const addToCart = (productId, quantity) => {
  return axios.post("/api/cart/add-product-to-cart", { productId, quantity });
};

const updateToCart = (productId, quantity) => {
  return axios.post("/api/cart/update-cart", {
    productId,
    quantity,
  });
};

const fetchAllItemsInCart = () => {
  return axios.get("/api/cart/read");
};

const deleteProductInCart = (id) => {
  return axios.post("/api/cart/delete", { id });
};

const clearCart = () => {
  return axios.post("/api/cart/clear");
};

const addOrder = (data) => {
  return axios.post("/api/order/create", { data });
};

const fetchOrdersById = () => {
  return axios.get("/api/order/read");
};

const fetchOrderDetails = (orderId) => {
  return axios.post("/api/order/details", { orderId });
};

const applyCoupon = (code) => {
  return axios.post("/api/coupon/apply", { code });
};

export {
  addToCart,
  fetchAllItemsInCart,
  deleteProductInCart,
  updateToCart,
  clearCart,
  addOrder,
  fetchOrdersById,
  fetchOrderDetails,
  applyCoupon,
};
