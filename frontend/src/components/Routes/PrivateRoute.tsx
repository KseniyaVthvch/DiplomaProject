import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const PrivateRoute = () => {
  const { isAuth } = useAppSelector((state) => state.auth);
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
