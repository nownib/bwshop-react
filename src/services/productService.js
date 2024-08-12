import axios from "../setup/axios";

const fetchAllProductTrending = () => {
  return axios.get("/api/product/trend");
};

const fetchAllCategories = () => {
  return axios.get("/api/category/read");
};
const fetchAllProducts = () => {
  return axios.get(`/api/product/read`);
};

const fetchProductDetails = (productId) => {
  return axios.post(`/api/product/read-details`, { productId });
};
export {
  fetchAllProductTrending,
  fetchAllCategories,
  fetchAllProducts,
  fetchProductDetails,
};
