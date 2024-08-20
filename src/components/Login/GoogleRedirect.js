import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginRedux } from "../../redux/action/actions";
import { useDispatch } from "react-redux";

const GoogleRedirect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginWithGoogle = async (token, email, username, id) => {
    if (token && email && username) {
      let data = {
        isAuthenticated: true,
        token,
        account: { username, email, id },
      };
      localStorage.setItem("Bearer", token);
      dispatch(loginRedux(data));
      navigate("/");
    }
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const email = urlParams.get("email");
    const username = urlParams.get("username");
    const id = urlParams.get("id");
    handleLoginWithGoogle(token, email, username, id);
  }, [navigate, loginRedux]);

  return <></>;
};

export default GoogleRedirect;
