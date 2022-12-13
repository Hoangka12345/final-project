import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TourPage from "./pages/TourPage";
import TourDetailPage from "./pages/TourDetailPage";
import CompanyInfoPage from "./pages/CompanyInfoPage";
import CheckOutPage from "./pages/CheckOutPage";
import ContactPage from "./pages/ContactPage";
import HistoryPage from "./pages/History";

import Page404 from "../../components/NotFoundPage";

function UserFeature(props) {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/tours" element={<TourPage />} />
      <Route path="/tour-detail" element={<TourDetailPage />} />
      <Route path="/company-introduction" element={<CompanyInfoPage />} />
      <Route path="/check-out" element={<CheckOutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/history" element={<HistoryPage />} />

      {/* <Route path="/transaction-history" element={<TransactionPage />} /> */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default UserFeature;
