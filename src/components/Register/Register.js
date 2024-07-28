import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../../services/userService";
import { UserContext } from "../../context/UserContext";

const Register = (props) => {
  const { user } = useContext(UserContext);
  let navigate = useNavigate();
  const handleToLoginPage = () => {
    navigate("/login");
  };

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const defaultValidInput = {
    isValidUsername: true,
    isValidPhone: true,
    isValidEmail: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  const checkValidInput = () => {
    setObjCheckInput(defaultValidInput);
    if (!username) {
      toast.error("User name is required");
      setObjCheckInput({ ...defaultValidInput, isValidUsername: false });
      return false;
    }
    if (!phone) {
      setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
      toast.error("Phone is required");
      return false;
    }
    if (!email) {
      toast.error("Email is required");
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!password) {
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      toast.error("Password is required");
      return false;
    }
    if (password !== confirmPassword) {
      setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false });
      toast.error("Password is not the same");
      return false;
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
    if (user && user.isAuthenticated) {
      navigate("/");
    }
  }, []);
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
                        placeholder="Username"
                        className={
                          objCheckInput.isValidUsername
                            ? "form-control"
                            : "form-control is-invalid"
                        }
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        onKeyUp={(event) => handlePressEnter(event)}
                      />
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
                        onChange={(event) => setPhone(event.target.value)}
                        onKeyUp={(event) => handlePressEnter(event)}
                      />
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
                        onChange={(event) => setEmail(event.target.value)}
                        onKeyUp={(event) => handlePressEnter(event)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        placeholder="Password"
                        className={
                          objCheckInput.isValidPassword
                            ? "form-control"
                            : "form-control is-invalid"
                        }
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyUp={(event) => handlePressEnter(event)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        placeholder="Comfirm password"
                        className={
                          objCheckInput.isValidConfirmPassword
                            ? "form-control"
                            : "form-control is-invalid"
                        }
                        value={confirmPassword}
                        onChange={(event) =>
                          setConfirmPassword(event.target.value)
                        }
                        onKeyUp={(event) => handlePressEnter(event)}
                      />
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
