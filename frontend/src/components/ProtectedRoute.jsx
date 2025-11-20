import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import PropTypes from 'prop-types';

export const ProtectedRoute = ({ children, requiredRole = 'staff' }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole === 'staff' && (user.role !== 'staff' && user.role !== 'admin')) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole === 'citizen' && user.role !== 'citizen') {
    return <Navigate to="/citizen/login" replace />;
  }

  return <>{children}</>;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.string,
};