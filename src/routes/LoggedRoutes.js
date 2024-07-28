import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const LoggedRoutes = (props) => {
  const { user } = useContext(UserContext);

  if (user && user.isAuthencated === true) {
    return <Navigate to="/" />; //vào url bị đá về /
  } else {
    return <Outlet />;
  }
};

export default LoggedRoutes;
