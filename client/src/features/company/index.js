import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import CreateTourPage from "./pages/CreateTourPage";
import EditTourPage from "./pages/EditTourPage";
import DashboardPage from "./pages/DashboardPage";
import HistoryPage from "./pages/HistoryPage";
import DetailBooking from "./pages/DetailBookingPage";
import DetailTourPage from "./pages/DetailTourPage";

import PrivateRouteCompany from "../../Utils/ProtectedRoute/PrivateRouteCompany";
import Page404 from "../../components/NotFoundPage";

function CompanyFeature(props) {
  return (
    <Routes>
      <Route element={<PrivateRouteCompany />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateTourPage />} />
        <Route path="/edit" element={<EditTourPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/detail-booking" element={<DetailBooking />} />
        <Route path="/detail-tour" element={<DetailTourPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default CompanyFeature;
