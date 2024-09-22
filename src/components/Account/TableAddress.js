import { useDispatch, useSelector } from "react-redux";
import "./Account.scss";
import { fetchAllAddressRedux } from "../../redux/action/actions";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { deleteAddressById } from "../../services/addressService";
import { toast } from "react-toastify";
import ModalAddress from "./ModalAddress";
import Address from "../Cart/Address";

const TableAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const listAddress = useSelector((state) => state.address.listAddress);
  const isLoading = useSelector((state) => state.order.isLoading);
  const [actionModalAddress, setActionModalAddress] = useState("");
  const [showModalAddress, setShowModalAddress] = useState(false);
  const [dataModalAddress, setDataModalAddress] = useState({});

  useEffect(() => {
    if (user && user.isAuthenticated === true) {
      dispatch(fetchAllAddressRedux());
    } else {
      navigate("/login");
    }
  }, [user]);

  const handleAddNewAddress = () => {
    setActionModalAddress("CREATE");
    setShowModalAddress(true);
  };
  const handleEditAddress = (item) => {
    setActionModalAddress("UPDATE");
    setDataModalAddress(item);
    setShowModalAddress(true);
  };

  const onHideModalAddress = async () => {
    setShowModalAddress(false);
    setDataModalAddress({});
  };

  const handleDeleteAddress = async (id) => {
    try {
      let response = await deleteAddressById(id);
      if (response && response.EC === 0) {
        toast.success("Delete address successfully");
        dispatch(fetchAllAddressRedux());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main>
      {isLoading === true ? (
        <>
          <div className="loading-container">
            <Audio
              height="80"
              width="80"
              radius="9"
              color="green"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
            <div>LOADING DATA ...</div>
          </div>
        </>
      ) : (
        <>
          <div className="order">
            <div class="mb-4 d-flex justify-content-end">
              <button
                type="submit"
                class="btn btn-add-address"
                onClick={() => handleAddNewAddress()}
              >
                Add new address
              </button>
            </div>
            <div className="order-header">
              <h3>Your Address</h3>
            </div>
            <div className="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>Specific address</th>
                    <th>Wards</th>
                    <th>District</th>
                    <th>Province</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listAddress && listAddress.length > 0 ? (
                    <>
                      {listAddress.map((item) => {
                        return (
                          <tr key={`row-${item.id}`}>
                            <td>{item.specificAddress}</td>
                            <td>{item.wards}</td>
                            <td>{item.district}</td>
                            <td>{item.province}</td>
                            <td className="btn-edit-delete">
                              <button
                                className="btn-green"
                                onClick={() => handleEditAddress(item)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn-red"
                                onClick={() => handleDeleteAddress(item.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <tr></tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      <ModalAddress
        show={showModalAddress}
        onHide={onHideModalAddress}
        actionModalAddress={actionModalAddress}
        dataModalAddress={dataModalAddress}
      />
    </main>
  );
};
export default TableAddress;
