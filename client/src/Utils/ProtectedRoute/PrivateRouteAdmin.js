import React from "react";
import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRouteAdmin() {
  const [cookie, setCookie, removeCookie] = useCookies();

  return cookie.token ? <Outlet /> : <Navigate to="/admin/login" />;
}

export default PrivateRouteAdmin;
