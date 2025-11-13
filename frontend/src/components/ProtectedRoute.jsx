import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import PropTypes from 'prop-types';

export const ProtectedRoute = ({ children }) => {
  const { user, isStaff, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !isStaff) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};