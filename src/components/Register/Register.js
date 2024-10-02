import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../../services/userService";
import { useSelector } from "react-redux";
import _ from "lodash";

const Register = (props) => {
  const user = useSelector((state) => state.user);
  const refEmailInput = useRef(null);
  let navigate = useNavigate();
  const handleToLoginPage = () => {
    navigate("/login");
  };

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const defaultValidInput = {
    isValidUsername: true,
    isValidPhone: true,
    isValidEmail: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);
  const phoneRegex = /^\d{10}$/;
  const emailRegx = /\S+@\S+\.\S+/;
  const passwordRegx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*"'()+,-./:;<=>?[\]^_`{|}~])(?=.{8,})/;

  const handleOnChangInput = (value, name) => {
    let _errorMessage = _.cloneDeep(errorMessages);
    if (name === "username") {
      setUsername(value);
      if (value.length <= 25 || value.length >= 2) {
        _errorMessage.username = "";
        setObjCheckInput({ ...objCheckInput, isValidUsername: true });
      }
    }
    if (name === "phone") {
      setPhone(value);
      if (phoneRegex.test(value)) {
        _errorMessage.phone = "";
        setObjCheckInput({ ...objCheckInput, isValidPhone: true });
      }
    }
    if (name === "email") {
      setEmail(value);
      if (emailRegx.test(value)) {
        _errorMessage.email = "";
        setObjCheckInput({ ...objCheckInput, isValidEmail: true });
      }
    }
    if (name === "password") {
      setPassword(value);
      if (passwordRegx.test(value)) {
        _errorMessage.password = "";
        setObjCheckInput({ ...objCheckInput, isValidPassword: true });
      }
    }
    if (name === "confirmPassword") {
      _errorMessage.confirmPassword = "";
      setObjCheckInput({ ...objCheckInput, isValidConfirmPassword: true });
      setConfirmPassword(value);
    }
    setErrorMessages(_errorMessage);
  };
  const checkValidInput = () => {
    setObjCheckInput(defaultValidInput);
    let _errorMessage = _.cloneDeep(errorMessages);
    let _defaultValidInput = _.cloneDeep(defaultValidInput);

    if (!username || username.length > 25 || username.length < 2) {
      _errorMessage.username =
        "Username must be at least 2 characters long and less than 25 characters long";
      _defaultValidInput.isValidUsername = false;
    }
    if (!email || !emailRegx.test(email)) {
      _errorMessage.email = "Email is valid";
      _defaultValidInput.isValidEmail = false;
    }

    if (!phone || !phoneRegex.test(phone)) {
      _errorMessage.phone = "Phone number must be 10 digits";
      _defaultValidInput.isValidPhone = false;
    }
    //passwordRegx
    if (!password || !passwordRegx.test(password)) {
      _errorMessage.password =
        " The password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character.";
      _defaultValidInput.isValidPassword = false;
    }
    if (!confirmPassword || password !== confirmPassword) {
      _errorMessage.confirmPassword = "Password is not the same";
      _defaultValidInput.isValidConfirmPassword = false;
    }
    setObjCheckInput(_defaultValidInput);
    setErrorMessages(_errorMessage);
    const values = Object.values(_defaultValidInput);
    for (const value of values) {
      if (!value) {
        return false;
      }
    }
    return true;
  };
  const handleRegister = async () => {
    let check = checkValidInput();
    if (check === true) {
      let response = await registerUser(username, phone, email, password);
      if (response && response.EC === 0) {
        toast.success(response.EM);
        navigate("/login");
      } else if (response && response.EC === 2) {
        setErrorMessages({ ...errorMessages, phone: response.EM });
        setObjCheckInput({ ...objCheckInput, isValidPhone: false });
        toast.error(response.EM);
      } else if (response && response.EC === 3) {
        setErrorMessages({ ...errorMessages, email: response.EM });
        setObjCheckInput({ ...objCheckInput, isValidEmail: false });
        toast.error(response.EM);
      } else {
        toast.error(response.EM);
      }
    }
  };
  const handlePressEnter = (event) => {
    if (event.key === "Enter") {
      handleRegister();
    }
  };
  useEffect(() => {
    refEmailInput.current.focus();
  }, []);

  useEffect(() => {
    if (user && user.isAuthenticated) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <>
      <div className="register-container">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-10 col-md-12 m-auto">
              <div className="row">
                <div className="content-left col-lg-6 col-md-8 pr-30">
                  <div className="heading-form mb-4">
                    <h1 className="mb-2">Create an Account</h1>
                    <p>
                      Already have an account?
                      <button
                        className="btn-login"
                        onClick={() => handleToLoginPage()}
                      >
                        Login
                      </button>
                    </p>
                  </div>
                  <div className="body-register">
                    <div className="form-group">
                      <input
                        type="text"
                        ref={refEmailInput}
                        placeholder="Username"
                        className={
                          objCheckInput.isValidUsername
                            ? "form-control"
                            : "form-control is-invalid"
                        }
                        value={username}
                        onChange={(event) =>
                          handleOnChangInput(event.target.value, "username")
                        }
                        onKeyUp={(event) => handlePressEnter(event)}
                      />
                      {errorMessages.username && (
                        <p
                          style={{
                            color: "red",
                            fontSize: "14px",
                            margin: "0",
                          }}
                        >
                          {errorMessages.username}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Phone number"
                        className={
                          objCheckInput.isValidPhone
                            ? "form-control"
                            : "form-control is-invalid"
                        }
                        value={phone}
                        onChange={(event) =>
                          handleOnChangInput(event.target.value, "phone")
                        }
                        onKeyUp={(event) => handlePressEnter(event)}
                      />
                      {errorMessages.phone && (
                        <p
                          style={{
                            color: "red",
                            fontSize: "14px",
                            margin: "0",
                          }}
                        >
                          {errorMessages.phone}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Email"
                        className={
                          objCheckInput.isValidEmail
                            ? "form-control"
                            : "form-control is-invalid"
                        }
                        value={email}
                        onChange={(event) =>
                          handleOnChangInput(event.target.value, "email")
                        }
                        onKeyUp={(event) => handlePressEnter(event)}
                      />
                      {errorMessages.email && (
                        <p
                          style={{
                            color: "red",
                            fontSize: "14px",
                            margin: "0",
                          }}
                        >
                          {errorMessages.email}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        placeholder="Password"
                        className={
                          objCheckInput.isValidPassword
                            ? "form-control password-input"
                            : "form-control is-invalid password-input"
                        }
                        value={password}
                        onChange={(event) =>
                          handleOnChangInput(event.target.value, "password")
                        }
                        onKeyUp={(event) => handlePressEnter(event)}
                      />
                      {errorMessages.password && (
                        <p
                          style={{
                            color: "red",
                            fontSize: "14px",
                            margin: "0",
                          }}
                        >
                          {errorMessages.password}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        placeholder="Comfirm password"
                        className={
                          objCheckInput.isValidConfirmPassword
                            ? "form-control password-input"
                            : "form-control is-invalid password-input"
                        }
                        value={confirmPassword}
                        onChange={(event) =>
                          handleOnChangInput(
                            event.target.value,
                            "confirmPassword"
                          )
                        }
                        onKeyUp={(event) => handlePressEnter(event)}
                      />
                      {errorMessages.confirmPassword && (
                        <p
                          style={{
                            color: "red",
                            fontSize: "14px",
                            margin: "0",
                          }}
                        >
                          {errorMessages.confirmPassword}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <button
                        className="btn btn-register mt-2"
                        onClick={() => handleRegister()}
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
                <div className="content-right col-lg-6 d-none d-lg-block ">
                  <h2>WELCOME TO BW SHOP!</h2>
                  <h4>The World's Snack Paradise</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
