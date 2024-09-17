import axios from "../setup/axios";

const fetchAllProvinces = () => {
  return axios.get("/api/address/province");
};
const fetchDistrictByProvince = (id) => {
  return axios.post("/api/address/district", { id });
};
const fetchWardsByDistrict = (id) => {
  return axios.post("/api/address/wards", { id });
};

const addAddress = (province, district, wards, specificAddress) => {
  return axios.post("/api/address/create", {
    province,
    district,
    wards,
    specificAddress,
  });
};
const fetchAllAddressByUser = () => {
  return axios.post("/api/address/read-address");
};
export {
  fetchAllProvinces,
  fetchDistrictByProvince,
  fetchWardsByDistrict,
  addAddress,
  fetchAllAddressByUser,
};
