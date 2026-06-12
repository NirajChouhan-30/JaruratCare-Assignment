import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import SupportPage from "../pages/SupportPage";
import VolunteerPage from "../pages/VolunteerPage";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "../components/ProtectedRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/support"
        element={<SupportPage />}
      />

      <Route
        path="/volunteer"
        element={<VolunteerPage />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;