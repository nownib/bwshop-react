import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";

const GoogleRedirect = () => {
  const navigate = useNavigate();
  const { loginContext } = useContext(UserContext);
  const handleLoginWithGoogle = async (token, email, username) => {
    if (token && email && username) {
      let data = {
        isAuthenticated: true,
        token,
        account: { username, email },
      };
      localStorage.setItem("Bearer", token);
      loginContext(data);
      toast.success("Login successful!");
      navigate("/");
    }
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const email = urlParams.get("email");
    const username = urlParams.get("username");
    handleLoginWithGoogle(token, email, username);
  }, [navigate, loginContext]);

  return <></>;
};

export default GoogleRedirect;
