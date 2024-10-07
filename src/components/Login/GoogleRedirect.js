import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleRedirect = () => {
  const navigate = useNavigate();
  const handleLoginWithGoogle = async (token) => {
    if (token) {
      localStorage.setItem("Bearer", token);
      window.location.href("/");
    }
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    handleLoginWithGoogle(token);
  }, [navigate]);

  return <></>;
};

export default GoogleRedirect;
