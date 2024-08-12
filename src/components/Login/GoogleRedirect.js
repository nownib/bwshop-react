import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../redux/action/actions";
import { useSelector, useDispatch } from "react-redux";

const GoogleRedirect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginWithGoogle = async (token, email, username) => {
    if (token && email && username) {
      let data = {
        isAuthenticated: true,
        token,
        account: { username, email },
      };
      localStorage.setItem("Bearer", token);
      dispatch(login(data));
      navigate("/");
    }
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const email = urlParams.get("email");
    const username = urlParams.get("username");
    handleLoginWithGoogle(token, email, username);
  }, [navigate, login]);

  return <></>;
};

export default GoogleRedirect;
