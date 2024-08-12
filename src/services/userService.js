import axios from "../setup/axios";

const registerUser = (username, phone, email, password) => {
  return axios.post("/api/register", {
    username,
    phone,
    email,
    password,
  });
};

const loginUser = (valueLogin, password) => {
  return axios.post("/api/login", {
    valueLogin,
    password,
  });
};

const getUserAccount = () => {
  return axios.get("/api/account");
};

const logoutUser = () => {
  return axios.get("/api/logout");
};

const loginWithGoogle = () => {
  return axios.get("/api/auth/google");
};
export { registerUser, loginUser, getUserAccount, logoutUser, loginWithGoogle };
