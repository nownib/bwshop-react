import "./ForgotPassword.scss";
import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import unlock from "../../assets/icons/forgot_password.svg";
import { sendCode, resetPassword } from "../../services/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [timeLeft, setTimeLeft] = useState(null);
  const refEmailReset = useRef(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    code: "",
    password: "",
    confirmPassword: "",
  });
  const passwordRegx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*"'()+,-./:;<=>?[\]^_`{|}~])(?=.{8,})/;

  const handleOnChangInput = (value, name) => {
    let _errorMessage = _.cloneDeep(errorMessages);
    if (name === "email") {
      _errorMessage.email = "";
      setEmail(value);
    }
    if (name === "code") {
      _errorMessage.code = "";
      setCode(value);
    }
    if (name === "password") {
      setNewPassword(value);
      if (passwordRegx.test(value)) {
        _errorMessage.password = "";
      }
    }
    if (name === "confirmPassword") {
      _errorMessage.confirmPassword = "";
      setConfirmPassword(value);
    }
    setErrorMessages(_errorMessage);
  };
  const checkValidateInput = () => {
    let check = true;
    let _errorMessage = _.cloneDeep(errorMessages);
    if (!email) {
      _errorMessage.email = "Please enter email";
      check = false;
    }
    if (!code) {
      _errorMessage.code = "Please enter code";
      check = false;
    }
    if (!newPassword || !passwordRegx.test(newPassword)) {
      _errorMessage.password =
        " The password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character.";
      check = false;
    }
    if (!confirmPassword || newPassword !== confirmPassword) {
      _errorMessage.confirmPassword = "Password is not the same";
      check = false;
    }
    setErrorMessages(_errorMessage);

    return check;
  };
  const handleSendCode = async () => {
    if (email) {
      let response = await sendCode(email);
      if (response && response.EC === 0) {
        toast.success(response.EM);
        setTimeLeft(120);
      } else {
        toast.error(response.EM);
      }
    } else {
      setErrorMessages({ ...errorMessages, email: "Please enter email" });
    }
  };
  const handleResetPassword = async () => {
    try {
      let check = checkValidateInput();

      if (check === true) {
        let data = {
          email,
          code,
          newPassword,
          confirmPassword,
        };
        let response = await resetPassword(data);
        if (response && response.EC === 0) {
          toast.success(response.EM);
          navigate("/login");
        } else if (response && response.EC === 2) {
          setErrorMessages({ ...errorMessages, password: response.EM });
        } else if (response && response.EC === 3) {
          setErrorMessages({ ...errorMessages, code: response.EM });
        } else {
          toast.error(response.EM);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    refEmailReset.current.focus();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);
  return (
    <main>
      <div class="forgot-page pt-80 pb-50">
        <div class="container">
          <div class="row">
            <div className="col-xl-4 col-lg-6 col-md-12 m-auto">
              <div class="content-forgot">
                <div class="heading">
                  <img src={unlock} alt="" />
                  <h2>Forgot your password?</h2>
                  <p>
                    Not to worry, we got you! Let’s get you a new password.{" "}
                  </p>
                </div>

                <form>
                  <div className="form-group">
                    <input
                      type="email"
                      ref={refEmailReset}
                      placeholder="Your Email *"
                      className="form-control"
                      required
                      onChange={(event) =>
                        handleOnChangInput(event.target.value, "email")
                      }
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
                  <div class="form-group d-flex">
                    <p
                      style={{
                        color: "#7e7e7e",
                        fontSize: "14px",
                        margin: "0",
                      }}
                    >
                      Haven't you received the code?
                    </p>
                    <button
                      type="button"
                      class="btn-send-code"
                      onClick={() => handleSendCode()}
                    >
                      {timeLeft > 0
                        ? `Resend OTP (${timeLeft}s)`
                        : `Send OTP code `}
                    </button>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Enter OTP code *"
                      className="form-control"
                      onChange={(event) =>
                        handleOnChangInput(event.target.value, "code")
                      }
                    />
                    {errorMessages.code && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "14px",
                          margin: "0",
                        }}
                      >
                        {errorMessages.code}
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      placeholder="New password *"
                      className="form-control password-input"
                      onChange={(event) =>
                        handleOnChangInput(event.target.value, "password")
                      }
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
                      placeholder="Confirm new password *"
                      className="form-control password-input"
                      onChange={(event) =>
                        handleOnChangInput(
                          event.target.value,
                          "confirmPassword"
                        )
                      }
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
                  <div class="form-group mt-4">
                    <button
                      type="button"
                      class="btn-reset"
                      onClick={() => handleResetPassword()}
                    >
                      Reset password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
