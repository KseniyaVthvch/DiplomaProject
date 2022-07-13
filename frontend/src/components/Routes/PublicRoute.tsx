import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const PublicRoute = () => {
  const { isAuth } = useAppSelector((state) => state.auth);
  return isAuth ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
