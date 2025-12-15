import { AppContext } from "@/context/AppContext";
import { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "sonner";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isLoggedIn, isAppLoading, userData } = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    if (!isAppLoading) {
      if (!isLoggedIn) {
        toast.error("Please log in to continue");
      } else if (
        allowedRoles &&
        userData &&
        !allowedRoles.includes(userData.role)
      ) {
        toast.error("You are not authorized to access this page.");
      }
    }
  }, [isLoggedIn, isAppLoading, userData, allowedRoles, location.pathname]);

  if (isAppLoading) return null;

  if (!isLoggedIn || !userData) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userData.role)) {
    return <Navigate to="/unauthorised" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
