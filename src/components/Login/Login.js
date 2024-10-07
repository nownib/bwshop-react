import { useEffect, useRef, useState } from "react";
import login1 from "../../assets/images/login-1.png";
import logoGoogle from "../../assets/images/logo-google.png";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userService";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserRedux, loginRedux } from "../../redux/action/actions";
import { Link } from "react-router-dom";

const Login = (props) => {
  const refValueLogin = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  let navigate = useNavigate();
  const handleToRegisterPage = () => {
    navigate("/register");
  };

  const handleLoginWithGoogle = async () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/api/auth/google`;
  };

  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");

  const defaultValidInput = {
    isValidValueLogin: true,
    isValidPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  const checkValidInput = () => {
    setObjCheckInput(defaultValidInput);
    if (!valueLogin) {
      toast.error("Value login is require");
      setObjCheckInput({ ...defaultValidInput, isValidValueLogin: false });
      return false;
    }
    if (!password) {
      toast.error("Password is require");
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    let check = checkValidInput();
    if (check === true) {
      let response = await loginUser(valueLogin, password);

      if (response && response.EC === 0) {
        let username = response.DT.username;
        let email = response.DT.email;
        let token = response.DT.token;
        let phone = response.DT.phone;
        let avatar = response.DT.avatar;
        let data = {
          isAuthenticated: true,
          token,
          account: { username, email, phone, avatar },
        };
        localStorage.setItem("Bearer", token);
        dispatch(loginRedux(data));
        window.location.reload();
        navigate("/");
      }
      if (response && response.EC !== 0) {
        toast.error(response.EM);
      }
    }
  };
  const handlePressEnter = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };
  useEffect(() => {
    refValueLogin.current.focus();
  }, []);

  useEffect(() => {
    if (user && user.isAuthenticated === true) {
      navigate("/");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [user, navigate]);

  return (
    <div className="login-container">
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-10 col-md-12 m-auto">
            <div className="row">
              <div className="content-left col-lg-6 pr-30 d-none d-lg-block">
                <img src={login1} alt="true" />
              </div>
              <div className="content-right col-lg-6 col-md-8 m-auto">
                <div className="heading-form mb-4">
                  <h1 className="mb-2">Login</h1>
                  <p>
                    Don't have an account?
                    <button
                      className="btn-register"
                      onClick={() => handleToRegisterPage()}
                    >
                      Create here
                    </button>
                  </p>
                </div>
                <div className="body-login">
                  <input
                    type="text"
                    ref={refValueLogin}
                    placeholder="Email or Phone number"
                    className={
                      objCheckInput.isValidValueLogin
                        ? "form-control "
                        : "form-control is-invalid "
                    }
                    onChange={(event) => setValueLogin(event.target.value)}
                    onKeyDown={(event) => handlePressEnter(event)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className={
                      objCheckInput.isValidPassword
                        ? "form-control password-input"
                        : "form-control is-invalid password-input"
                    }
                    onChange={(event) => setPassword(event.target.value)}
                    onKeyDown={(event) => handlePressEnter(event)}
                  />
                  <div className="login-footer row mb-4 mb-md-5">
                    <div className="check-remember col-6 me-auto">
                      <label className="custom-checkbox">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                        Remember me
                      </label>
                    </div>
                    <div className="col-6 text-end">
                      <span>
                        <Link
                          to={`/forgot-password`}
                          className="forgot-password"
                        >
                          Forgot password?
                        </Link>
                      </span>
                    </div>
                  </div>
                  <div className="mb-md-4 mb-2">
                    <button
                      className="btn btn-login"
                      onClick={() => {
                        handleLogin();
                      }}
                    >
                      Login
                    </button>
                  </div>
                  <div className="login-google">
                    <button
                      className="btn btn-google"
                      onClick={() => {
                        handleLoginWithGoogle();
                      }}
                    >
                      <img src={logoGoogle} width={28} height={28} />
                      <span className="py- ms-2">Continue with Google</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
