import "./Account.scss";
import noAvatar from "../../assets/images/account-no-avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import { updateAccountRedux, setActiveRedux } from "../../redux/action/actions";
import { logoutUser, uploadAndGetImage } from "../../services/userService";
import { useNavigate, Link } from "react-router-dom";
import { logoutRedux } from "../../redux/action/actions";
import Order from "./Order";
import Address from "./Address";

const Account = () => {
  const user = useSelector((state) => state.user.account);
  const [userData, setUserData] = useState(user);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [avatar, setAvatar] = useState(noAvatar);
  const [isUploading, setIsUploading] = useState(false);
  const active = useSelector((state) => state.account.active);

  const handleOnChangInput = (value, name) => {
    if (name === "email" && value.length > 20) {
      setErrorMessage("Username must not exceed 20 characters.");
    } else {
      setErrorMessage("");
    }
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };

  const handleFileChange = async (event) => {
    let file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setIsUploading(true);
      try {
        let response = await uploadAndGetImage(formData);
        if (response && response.EC === 0) {
          setUserData({ ...userData, avatar: response.DT });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const checkValidateInput = () => {
    let check = true;
    let arr = ["username", "phone"];
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        toast.error(`Empty input ${arr[i]}`);
        check = false;
        break;
      }
    }
    return check;
  };

  const handleUpdateAccount = async () => {
    let check = checkValidateInput();
    if (check === true) {
      dispatch(updateAccountRedux(userData));
      await logoutUser();
    }
  };

  const navigate = useNavigate();
  // Hàm xử lý khi click vào mục
  const handleActive = (index) => {
    dispatch(setActiveRedux(index));
  };
  const handleLogout = async () => {
    let data = await logoutUser(); //clear cookie
    localStorage.removeItem("Bearer"); //clear localstorage
    dispatch(logoutRedux());
    sessionStorage.clear();
    if (data && data.EC === 0) {
      toast.success("Logout successfully!");
      navigate("/login");
    } else {
      toast.error(data.EM);
    }
  };

  const sidebarItem = [
    { name: "Account", icon: "fa-regular fa-user", route: "/account" },
    {
      name: "Your Orders",
      icon: "fa-brands fa-shopify",
      route: "/account/orders",
    },
    {
      name: "My Address",
      icon: "fa-solid fa-location-dot",
      route: "/account/address",
    },
  ];

  return (
    <main>
      <div className="page-content pt-100 pb-100">
        <div className="container">
          <div class="col-lg-10 m-auto">
            <div className="row">
              <div className="col-md-3">
                <div className="sidebar">
                  <ul className="nav flex-column">
                    {sidebarItem.map((item, index) => (
                      <li
                        key={index}
                        className="nav-item"
                        onClick={() => handleActive(index)}
                      >
                        <Link
                          className={`nav-link ${
                            active === index ? "selected" : ""
                          }`}
                          to={
                            index === 0
                              ? `${item.route}`
                              : index === 1
                              ? `${item.route}`
                              : `${item.route}`
                          }
                        >
                          <i className={`${item.icon} mr-10 icon-group`}></i>
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                    <li className="nav-item">
                      <Link className="nav-link" onClick={() => handleLogout()}>
                        <i class="fa-solid fa-arrow-right-from-bracket mr-10 icon-group"></i>
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-9">
                <div className="account pl-50">
                  {active === 0 ? (
                    <div className="card">
                      <div className="cart-header">
                        <h5>Account</h5>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div class="col-md-12 form-group">
                            <label for="">Email *</label>
                            <input
                              type="text"
                              disabled
                              value={userData?.email}
                              className="form-control"
                            />
                          </div>
                          <div class="col-md-12 form-group">
                            <label for="">Full name *</label>
                            <input
                              type="text"
                              value={userData?.username}
                              className="form-control"
                              onChange={(event) =>
                                handleOnChangInput(
                                  event.target.value,
                                  "username"
                                )
                              }
                            />
                            {errorMessage && (
                              <p
                                style={{
                                  color: "red",
                                  fontSize: "14px",
                                  margin: "0",
                                }}
                              >
                                {errorMessage}
                              </p>
                            )}
                          </div>
                          <div class="col-md-12 form-group">
                            <label for="">Mobile *</label>
                            <input
                              type="tel"
                              value={userData?.phone}
                              className="form-control"
                              onChange={(event) =>
                                handleOnChangInput(event.target.value, "phone")
                              }
                            />
                          </div>
                          <div class="col-md-12 form-group">
                            <label for="">Avatar</label>
                            <input
                              type="file"
                              className="form-control"
                              style={{ paddingTop: "20px" }}
                              onChange={(event) => handleFileChange(event)}
                            />
                            <div class="image-upload">
                              <div>
                                <img
                                  src={
                                    userData?.avatar ? userData?.avatar : avatar
                                  }
                                  alt="Avatar"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="col-md-12">
                            <button
                              type="submit"
                              class="btn-save btn"
                              onClick={() => handleUpdateAccount()}
                              disabled={isUploading}
                            >
                              {isUploading ? "Uploading..." : "Save change"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>{active === 1 ? <Order /> : <Address />}</>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Account;
