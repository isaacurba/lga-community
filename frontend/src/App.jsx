import { Route, Routes } from "react-router-dom"
import StaffHome from './pages/staff/StaffHome';
import StaffLogin from './pages/staff/StaffLogin';
import EmailVerify from './pages/staff/EmailVerify';
import StaffResetPassword from './pages/staff/StaffResetPassword';

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<StaffHome/>}/>
          <Route path='/staff-login' element={<StaffLogin/>}/>
          <Route path='/verify-email' element={<EmailVerify/>}/>
          <Route path='/staff-reset-password' element={<StaffResetPassword/>}/>
          

        </Routes>
      </div>
    </>
  );
}

export default App;