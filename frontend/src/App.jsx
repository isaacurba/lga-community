import { Route, Routes } from "react-router-dom";
import StaffHome from './pages/Home';
import Login from './components/Login';
import EmailVerify from './components/EmailVerify';
import StaffResetPassword from './pages/staff/StaffResetPassword';
import StaffRegister from "./pages/staff/StaffRegister";
import StaffDashboard from "./pages/staff/StaffDashboard";
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorised from "./components/Unauthorised";

function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<StaffHome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/staff/register" element={<StaffRegister />} />
      <Route path="/unauthorised" element={<Unauthorised />} />

      {/* =============== STAFF PROTECTED =============== */}
      <Route element={<ProtectedRoute allowedRoles={["staff"]} />}>
        <Route path="/verify-email" element={<EmailVerify />} />
        <Route path="/staff/reset-password" element={<StaffResetPassword />} />
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
      </Route>

      {/* =============== CITIZEN PROTECTED =============== */}
      <Route element={<ProtectedRoute allowedRoles={["citizen"]} />}>
        <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
      </Route>

    </Routes>
  );
}

export default App;
