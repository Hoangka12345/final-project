import { Navigate, Route, Routes } from "react-router-dom";

import UserFeature from "./features/user";
import CompanyFeature from "./features/company";
import AdminFeature from "./features/admin";
import { useEffect } from "react";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<UserFeature />} />
      <Route path="/company/*" element={<CompanyFeature />} />
      <Route path="/admin/*" element={<AdminFeature />} />
    </Routes>
  );
}

export default App;
