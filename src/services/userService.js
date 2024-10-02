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

const updateAccount = (userData) => {
  return axios.put("/api/account/update", { userData });
};

const uploadAndGetImage = (formData) => {
  return axios.post("/api/account/upload-image", formData);
};

const sendCode = (email) => {
  return axios.post("/api/send-email", { email });
};
const resetPassword = (data) => {
  return axios.post("/api/reset-password", { data });
};

export {
  registerUser,
  loginUser,
  getUserAccount,
  logoutUser,
  loginWithGoogle,
  updateAccount,
  uploadAndGetImage,
  sendCode,
  resetPassword,
};
