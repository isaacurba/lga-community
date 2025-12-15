import { Route, Routes } from "react-router-dom";
import StaffHome from './pages/Home';
import Login from './pages/auth/Login';
import EmailVerify from './pages/staff/EmailVerify';
import ResetPassword from './pages/auth/ResetPassword';
import StaffRegister from "./pages/staff/StaffRegister";
import StaffDashboard from "./pages/staff/StaffDashboard";
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorised from "./components/Unauthorised";
import Documentation from "./components/Documentation";

function App() {
  return (
    <Routes>

      <Route path="/" element={<StaffHome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/staff/register" element={<StaffRegister />} />
      <Route path="/unauthorised" element={<Unauthorised />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/staff/verify-email" element={<EmailVerify />} />
      <Route path="/documentation" element={<Documentation />} />

      <Route element={<ProtectedRoute allowedRoles={["staff"]} />}>
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["citizen"]} />}>
        <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
      </Route>

    </Routes>
  );
}

export default App;
