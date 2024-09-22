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

const addAddress = (
  provinceId,
  districtId,
  wardsId,
  province,
  district,
  wards,
  specificAddress
) => {
  return axios.post("/api/address/create", {
    provinceId,
    districtId,
    wardsId,
    province,
    district,
    wards,
    specificAddress,
  });
};
const fetchAllAddressByUser = () => {
  return axios.get("/api/address/read-address");
};

const deleteAddressById = (id) => {
  return axios.delete(`/api/address/delete/${id}`);
};
const updateAddress = (
  addressId,
  provinceId,
  districtId,
  wardsId,
  province,
  district,
  wards,
  specificAddress
) => {
  return axios.post("/api/address/update", {
    addressId,
    provinceId,
    districtId,
    wardsId,
    province,
    district,
    wards,
    specificAddress,
  });
};

export {
  fetchAllProvinces,
  fetchDistrictByProvince,
  fetchWardsByDistrict,
  addAddress,
  fetchAllAddressByUser,
  deleteAddressById,
  updateAddress,
};
