import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginRedux } from "../../redux/action/actions";

const GoogleRedirect = () => {
  const navigate = useNavigate();
  const handleLoginWithGoogle = async (token) => {
    if (token) {
      localStorage.setItem("Bearer", token);
      window.location.reload();
      navigate("/");
    }
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    handleLoginWithGoogle(token);
  }, [navigate, loginRedux]);

  return <></>;
};

export default GoogleRedirect;
