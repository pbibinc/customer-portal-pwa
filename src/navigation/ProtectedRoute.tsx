import React from "react";
import {useAppSelector} from "../store";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const token = useAppSelector((state) => state.userSlice.token);

  if (!token) {
    // If no token, redirect to the SignIn page
    return <Navigate to="/SignIn" />;
  }

  // If token exists, render the child routes (Outlet renders the current route's element)
  return <Outlet />;
};

export default ProtectedRoute;
