import { Route, Routes } from "react-router-dom"
import StaffHome from './pages/staff/Home';
import StaffLogin from './pages/staff/Login';
import EmailVerify from './pages/staff/EmailVerify';
import StaffResetPassword from './pages/staff/StaffResetPassword';
import StaffRegister from "./pages/staff/StaffRegister";
import StaffDashboard from "./pages/staff/StaffDashboard";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<StaffHome/>}/>
          <Route path='/staff/register' element={<StaffRegister/>}/>
          <Route path='/login' element={<StaffLogin/>}/>
          <Route path='/verify-email' element={<EmailVerify/>}/>
          <Route path='/staff/reset-password' element={<StaffResetPassword/>}/>
          <Route path='/staff/dashboard' element={<StaffDashboard/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;