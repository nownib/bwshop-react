import axios from "../setup/axios";

const addToCart = (productId, quantity) => {
  return axios.post("/api/cart/add-product-to-cart", { productId, quantity });
};

const fetchAllItemsInCart = () => {
  return axios.get("/api/cart/read");
};

const deleteProductInCart = (id) => {
  return axios.post("/api/cart/delete", { id });
};

export { addToCart, fetchAllItemsInCart, deleteProductInCart };
