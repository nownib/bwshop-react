import {
  fetchAllProvinces,
  fetchDistrictByProvince,
  fetchWardsByDistrict,
  addAddress,
  updateAddress,
} from "../../services/addressService";
import { useEffect, useState } from "react";
import "./Address.scss";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAddressRedux } from "../../redux/action/actions";

const Address = (props) => {
  const user = useSelector((state) => state.user);
  const [specificAddress, setSpecificAddress] = useState("");

  const [provinceId, setProvinceId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [wardsId, setWardsId] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [wards, setWards] = useState("");

  const [listProvinces, setListProvinces] = useState([]);
  const [listDistricts, setListDistricts] = useState([]);
  const [listWards, setListWards] = useState([]);
  const dispatch = useDispatch();
  const { actionModalAddress, dataModalAddress } = props;
  useEffect(() => {
    if (user && user.isAuthenticated && user.token) {
      getAllProvinces();
    }
  }, [user]);

  useEffect(() => {
    if (actionModalAddress === "UPDATE") {
      setProvinceId(dataModalAddress?.provinceId);
      setProvince(dataModalAddress?.province);
      setDistrictId(dataModalAddress?.districtId);
      setDistrict(dataModalAddress?.district);
      setWardsId(dataModalAddress?.wardsId);
      setWards(dataModalAddress?.wards);
      setSpecificAddress(dataModalAddress?.specificAddress);
      getDistrictByProvince(dataModalAddress?.provinceId);
      getWardsByDistrict(dataModalAddress?.districtId);
    }
  }, [dataModalAddress]);

  const getAllProvinces = async () => {
    try {
      let response = await fetchAllProvinces();
      if (response && response.EC === 0) {
        setListProvinces(response.DT);
      }
    } catch (error) {
      console.log("Error get all provinces", error);
    }
  };
  const getDistrictByProvince = async (provinceId) => {
    try {
      if (provinceId) {
        let response = await fetchDistrictByProvince(provinceId);
        if (response && response.EC === 0) {
          setListDistricts(response.DT);
        }
      }
    } catch (error) {
      console.log("Error get district", error);
    }
  };
  const getWardsByDistrict = async (districtId) => {
    try {
      if (districtId) {
        let response = await fetchWardsByDistrict(districtId);
        if (response && response.EC === 0) {
          setListWards(response.DT);
        }
      }
    } catch (error) {
      console.log("Error get wards", error);
    }
  };
  const handleOnChangeOptionProvince = async (event) => {
    try {
      const id = event.target.value;
      const selectedIndex = event.target.selectedIndex;
      const name = event.target.options[selectedIndex].text;
      if (id) {
        setProvinceId(id);
        setProvince(name);
        getDistrictByProvince(id);
        setDistrictId("");
      } else {
        setProvinceId("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChangeOptionDistrict = async (event) => {
    try {
      const id = event.target.value;
      const selectedIndex = event.target.selectedIndex;
      const name = event.target.options[selectedIndex].text;
      if (id) {
        setDistrictId(id);
        setDistrict(name);
        getWardsByDistrict(id);
        setWardsId("");
      } else {
        setDistrictId("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnChangeOptionWards = async (event) => {
    try {
      const id = event.target.value;
      const selectedIndex = event.target.selectedIndex;
      const name = event.target.options[selectedIndex].text;
      if (id) {
        setWards(name);
        setWardsId(id);
      } else {
        setWardsId("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkValidInput = () => {
    if (
      !province ||
      !district ||
      !wards ||
      !specificAddress ||
      !provinceId ||
      !districtId ||
      !wardsId
    ) {
      toast.error("Please enter your address");
      return false;
    }
    return true;
  };

  const handleClickAddress = async () => {
    let check = checkValidInput();
    if (check === true) {
      let response =
        actionModalAddress === "CREATE" || actionModalAddress === undefined
          ? await addAddress(
              provinceId,
              districtId,
              wardsId,
              province,
              district,
              wards,
              specificAddress
            )
          : await updateAddress(
              dataModalAddress?.id,
              provinceId,
              districtId,
              wardsId,
              province,
              district,
              wards,
              specificAddress
            );
      if (response && response.EC === 0) {
        toast.success(response.EM);
        if (
          actionModalAddress === "CREATE" ||
          actionModalAddress === undefined
        ) {
          setSpecificAddress("");
        }
      } else if (response && response.EC === 1) {
        toast.error(response.EM);
      }
      dispatch(fetchAllAddressRedux());
    }
  };
  return (
    <main>
      <div class="address-container">
        <div class="row d-flex">
          <div class="col-md-4 col-lg-3">
            <div class="custome-select mt-20">
              <select
                className="form-control"
                onChange={(event) => handleOnChangeOptionProvince(event)}
              >
                <option value="" className="custome-option">
                  Please enter your province
                </option>
                {listProvinces &&
                  listProvinces.length > 0 &&
                  listProvinces.map((item) => {
                    return (
                      <option
                        key={item.id}
                        value={item.id}
                        className="custome-option"
                        selected={item.id === dataModalAddress?.provinceId}
                      >
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div class="col-md-4 col-lg-3">
            <div class="custome-select mt-20">
              <select
                className="form-control"
                onChange={(event) => handleOnChangeOptionDistrict(event)}
              >
                <option value="" className="custome-option">
                  Please enter your district
                </option>
                {listDistricts &&
                  listDistricts.length > 0 &&
                  listDistricts.map((item) => {
                    return (
                      <option
                        key={item.id}
                        value={item.id}
                        className="custome-option"
                        selected={item.id === dataModalAddress?.districtId}
                      >
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div class="col-md-4 col-lg-3">
            <div class="custome-select mt-20">
              <select
                className="form-control"
                onChange={(event) => handleOnChangeOptionWards(event)}
              >
                <option value="" className="custome-option">
                  Please enter your wards
                </option>
                {listWards &&
                  listWards.length > 0 &&
                  listWards.map((item) => {
                    return (
                      <option
                        key={item.id}
                        value={item.id}
                        className="custome-option"
                        selected={item.id === dataModalAddress?.wardsId}
                      >
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </div>
        <div class="row d-flex mt-2">
          <div className="col-md-9">
            <div div class="custome-select mt-20 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Street name, house number, specific address"
                value={specificAddress}
                onChange={(event) => setSpecificAddress(event.target.value)}
              />
            </div>
          </div>
          <div class="col-md-3 mt-20 mb-50 d-flex justify-content-center">
            <button
              type="submit"
              class="btn btn-add-address"
              onClick={() => handleClickAddress()}
            >
              {props.actionModalAddress === "UPDATE"
                ? "Edit address"
                : "Add address"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Address;
