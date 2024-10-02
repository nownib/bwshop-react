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
  return axios.get(`/api/product/read-details/${productId}`);
};
const upSertReview = (data) => {
  return axios.post(`/api/product/review`, { data });
};

const fetchReviewsByProduct = (productId) => {
  return axios.get(`/api/product/read-review/${productId}`);
};

const fetchRatingsByStar = (productId) => {
  return axios.get(`/api/product/read-rating-by-star/${productId}`);
};
export {
  fetchAllProductTrending,
  fetchAllCategories,
  fetchAllProducts,
  fetchProductDetails,
  upSertReview,
  fetchReviewsByProduct,
  fetchRatingsByStar,
};
