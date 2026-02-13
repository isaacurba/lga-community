import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import AppContextProviderWrapper from "./context/AppContextProviderWrapper.jsx";
import Home from './pages/Home';
import Documentation from './pages/Documentation';
import Login from './pages/auth/Login';
import EmailVerify from './pages/staff/EmailVerify';
import CitizenEmailVerify from './pages/citizen/EmailVerify';
import ResetPassword from './pages/auth/ResetPassword';
import StaffRegister from "./pages/staff/StaffRegister";
import StaffDashboard from "./pages/staff/StaffDashboard";
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import CitizenProfile from "./pages/citizen/profile/CitizenProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorised from "./components/Unauthorised";
import StaffCitizens from "./pages/staff/StaffCitizens";
import RegisterCitizen from "./pages/staff/RegisterCitizen";
import RootLayout from "./layout/RootLayout.jsx";
import NotFound from "./components/NotFound";
import ScrollToTop from "./components/ScrollToTop.jsx";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(

      <Route element={<ScrollToTop />}>
        <Route element={<AppContextProviderWrapper />}>
          
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="documentation" element={<Documentation />} />
          </Route>

          {/*  Public Routes */}
          <Route path="login" element={<Login />} />
          <Route path="staff/register" element={<StaffRegister />} />
          <Route path="unauthorised" element={<Unauthorised />} />
          <Route path="reset-password" element={<ResetPassword />} />

          {/* Protected Staff Routes */}
          <Route element={<ProtectedRoute allowedRoles={["staff"]} />}>
            <Route path="staff/verify-email" element={<EmailVerify />} />
            <Route path="staff/dashboard" element={<StaffDashboard />} />
            <Route path="staff/citizens" element={<StaffCitizens />} />
            <Route path="staff/register-citizen" element={<RegisterCitizen />} />
          </Route>

          {/* Protected Citizen Routes */}
          <Route element={<ProtectedRoute allowedRoles={["citizen"]} />}>
            <Route path="citizen/verify-email" element={<CitizenEmailVerify />} />
            <Route path="citizen/dashboard" element={<CitizenDashboard />} />
            <Route path="citizen/profile" element={<CitizenProfile />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>        
      </Route>

    )
  );


  return (
    <RouterProvider router={router} />
  );
}

export default App;
