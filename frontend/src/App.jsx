import { Route, Routes } from "react-router-dom"
import StaffHome from './pages/staff/Home';
import StaffLogin from './pages/staff/Login';
import EmailVerify from './pages/staff/EmailVerify';
import StaffResetPassword from './pages/staff/StaffResetPassword';
import StaffRegister from "./pages/staff/StaffRegister";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<StaffHome/>}/>
          <Route path='/staff/register' element={<StaffRegister/>}/>
          <Route path='/login' element={<StaffLogin/>}/>
          <Route path='/verify-email' element={<EmailVerify/>}/>
          <Route path='/staff-reset-password' element={<StaffResetPassword/>}/>
          

        </Routes>
      </div>
    </>
  );
}

export default App;