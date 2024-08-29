import axios from "../setup/axios";

const addProductToWishlist = (id) => {
  return axios.post(`/api/wishlist/add-to-wishlist`, { id });
};

const fetchAllItemsInWishlist = () => {
  return axios.get(`/api/wishlist/read`);
};

const deleteProductInWishlist = (id) => {
  return axios.post("/api/wishlist/delete", { id });
};

export {
  addProductToWishlist,
  fetchAllItemsInWishlist,
  deleteProductInWishlist,
};
