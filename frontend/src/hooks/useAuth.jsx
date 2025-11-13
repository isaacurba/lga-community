import { useState, useEffect, createContext, useContext } from 'react';
import { useToast } from '@/hooks/use-toast';
import PropTypes from 'prop-types';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // TODO: Implement auth state management with your MongoDB backend
    setLoading(false);
  }, []);

  const signIn = async (email, password) => {
    // TODO: Implement sign in with your MongoDB backend
    toast({
      title: 'Login',
      description: 'Sign in functionality to be implemented with MongoDB backend.',
    });
    return { error: null };
  };

  const signUp = async (email, password) => {
    // TODO: Implement sign up with your MongoDB backend
    toast({
      title: 'Signup',
      description: 'Sign up functionality to be implemented with MongoDB backend.',
    });
    return { error: null };
  };

  const signOut = async () => {
    setUser(null);
    setIsStaff(false);
    toast({
      title: 'Signed Out',
      description: 'You have been successfully signed out.',
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, isStaff, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};