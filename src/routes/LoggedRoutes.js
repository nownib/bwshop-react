import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserRedux } from "../redux/action/actions";

const LoggedRoutes = (props) => {
  const user = useSelector((state) => state.user);
  const isAuthencated = useSelector((state) => state.user.isAuthenticated);
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch;
};

export default LoggedRoutes;
