import axios from "../setup/axios";

const fetchAllBlogs = () => {
  return axios.get("/api/blog/read");
};

export { fetchAllBlogs };
