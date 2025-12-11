import { AppContext } from '@/context/AppContext'
import { useContext,  useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { toast } from 'sonner'

const ProtectedRoute = ({ allowedRoles }) => {
  const { isLoggedIn, isAppLoading, userData } = useContext(AppContext);
  const [hasShownToast, setHasShownToast] = useState(false);

  console.log(isLoggedIn)
  
  if (isAppLoading) {
    return null; 
  }

  if (!isLoggedIn) {
    if (!hasShownToast) {
      toast.error("Please log in to continue.");
      setHasShownToast(true);
    }
    return <Navigate to="/login" replace />;
  }

  if (!userData) {
    return null;
  }

  const userRole = userData?.role;

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    if (!hasShownToast) {
      toast.error("You are not authorized to access this page.");
      setHasShownToast(true);
    }

    return <Navigate to="/unauthorised" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
