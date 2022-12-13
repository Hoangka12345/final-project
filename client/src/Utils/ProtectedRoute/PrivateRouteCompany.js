import React from "react";
import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRouteCompany() {
  const [cookie, setCookie, removeCookie] = useCookies();

  return cookie.token ? <Outlet /> : <Navigate to="/company/login" />;
}

export default PrivateRouteCompany;
