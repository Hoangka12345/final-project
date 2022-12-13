import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ManagerUserPage from "./pages/ManagerUserPage";
import ManagerCompanyPage from "./pages/ManagerCompanyPage";
import ManagerUnverifyCompanyPage from "./pages/ManagerUnverifyCompanyPage";
import ManagerVerifyCompanyPage from "./pages/ManagerVerifyCompanyPage";
import UserInfoDetail from "./pages/UserInfoDetail";
import CompanyInfoDetail from "./pages/CompanyInfoDetail";
import ManagerBookingPage from "./pages/ManagerBookingPage";
import BookingDetailPage from "./pages/BookingDetailPage";
import DashboardPage from "./pages/DashboardPage";

import PrivateRouteAdmin from "../../Utils/ProtectedRoute/PrivateRouteAdmin";

function AdminFeature(props) {
  return (
    <Routes>
      <Route element={<PrivateRouteAdmin />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<ManagerUserPage />} />
        <Route path="/company" element={<ManagerCompanyPage />} />
        <Route path="/unverify-company" element={<ManagerUnverifyCompanyPage />} />
        <Route path="/verify-company" element={<ManagerVerifyCompanyPage />} />
        <Route path="/user-detail" element={<UserInfoDetail />} />
        <Route path="/company-detail" element={<CompanyInfoDetail />} />
        <Route path="/booking" element={<ManagerBookingPage />} />
        <Route path="/booking-detail" element={<BookingDetailPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default AdminFeature;
