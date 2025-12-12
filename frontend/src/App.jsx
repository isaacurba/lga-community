import { Route, Routes } from "react-router-dom";
import StaffHome from './pages/Home';
import Login from './components/Login';
import EmailVerify from './components/EmailVerify';
import ResetPassword from './components/ResetPassword';
import StaffRegister from "./pages/staff/StaffRegister";
import StaffDashboard from "./pages/staff/StaffDashboard";
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorised from "./components/Unauthorised";

function App() {
  return (
    <Routes>

      <Route path="/" element={<StaffHome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/staff/register" element={<StaffRegister />} />
      <Route path="/unauthorised" element={<Unauthorised />} />
      <Route path="/reset-password" element={<ResetPassword />} />


      <Route element={<ProtectedRoute allowedRoles={["staff"]} />}>
        <Route path="/verify-email" element={<EmailVerify />} />
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["citizen"]} />}>
        <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
      </Route>

    </Routes>
  );
}

export default App;
