import "./Account.scss";
import Sidebar from "./Sidebar";
import noAvatar from "../../assets/images/account-no-avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import { updateAccountRedux } from "../../redux/action/actions";
import { logoutUser } from "../../services/userService";

const Account = () => {
  const user = useSelector((state) => state.user.account);
  const [userData, setUserData] = useState(user);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [avatar, setAvatar] = useState(noAvatar);

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

  const handleFileChange = (event) => {
    let file = event.target.files[0];
    if (file) {
      let avatar = URL.createObjectURL(file);
      console.log("check avatar", avatar);
      setUserData({ ...userData, avatar });
      // let avatar = `${process.env.REACT_APP_BACKEND_URL}/${file}`;
      // const reader = new FileReader();
      // reader.onload = (event) => {
      //   const avatar = event.target.result;

      // };
      // reader.readAsDataURL(file);
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

  useEffect(() => {
    // console.log("check user", user);
  }, []);
  return (
    <main>
      <div className="page-content pt-100 pb-100">
        <div className="container">
          <div class="col-lg-10 m-auto">
            <div className="row">
              <div className="col-md-3">
                <Sidebar />
              </div>
              <div className="col-md-9">
                <div className="account pl-50">
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
                              handleOnChangInput(event.target.value, "username")
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
                          >
                            Save Change
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      đây là account
    </main>
  );
};

export default Account;
