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
import StaffCitizens from "./pages/staff/StaffCitizens";
// import CitizenRegister from "./pages/staff/CitizenRegister.jsx"; 

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<StaffHome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/staff/register" element={<StaffRegister />} /> 
      <Route path="/unauthorised" element={<Unauthorised />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected Staff Routes */}
      <Route element={<ProtectedRoute allowedRoles={["staff"]} />}>
        <Route path="/verify-email" element={<EmailVerify />} />
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
        <Route path="/staff/citizens" element={<StaffCitizens />} />
        {/* <Route path="/staff/register-citizen" element={<CitizenRegister />} /> */}
      </Route>

      {/* Protected Citizen Routes */}
      <Route element={<ProtectedRoute allowedRoles={["citizen"]} />}>
        <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
      </Route>

    </Routes>
  );
}

export default App;