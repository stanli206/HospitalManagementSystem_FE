import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Layout from "./components/shared/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import PatientListPage from "./pages/patients/PatientListPage";
import PatientFormPage from "./pages/patients/PatientFormPage";
import AppointmentListPage from "./pages/appointments/AppointmentListPage";
import AppointmentFormPage from "./pages/appointments/AppointmentFormPage";
import DashboardPage from "./pages/dashboard/DashboardPage"
import ProtectedRoute from "./components/shared/ProtectedRoute";

function App() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<DashboardPage />} />

          {/* Patient routes */}
          <Route path="patients">
            <Route index element={<PatientListPage />} />
            <Route path="new" element={<PatientFormPage />} />
            <Route path=":id/edit" element={<PatientFormPage />} />
          </Route>

          {/* Appointment routes */}
          <Route path="appointments">
            <Route index element={<AppointmentListPage />} />
            <Route path="new" element={<AppointmentFormPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
