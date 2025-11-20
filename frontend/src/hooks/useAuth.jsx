import { useState, useEffect, createContext, useContext } from 'react';
import { useToast } from '@/hooks/use-toast';
import PropTypes from 'prop-types';

const AuthContext = createContext(undefined);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isStaff, setIsStaff] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in on app start
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        // Optionally verify token with backend, but for now assume valid
        // For simplicity, we'll store user in localStorage too
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsStaff(userData.role === 'staff' || userData.role === 'admin');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const signIn = async (email, password, isCitizen = false) => {
    try {
      const endpoint = isCitizen ? '/citizen/login' : '/login';
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        setIsStaff(data.user.role === 'staff' || data.user.role === 'admin');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        toast({
          title: 'Login Successful',
          description: `Welcome ${data.user.name || data.user.firstName}!`,
        });
        return { error: null };
      } else {
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: data.message,
        });
        return { error: data.message };
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An error occurred during login.',
      });
      return { error: error.message };
    }
  };

  const signUp = async (formData) => {
    // For staff registration of citizens
    try {
      const response = await fetch(`${API_BASE_URL}/staff/register-citizen`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Citizen Registered',
          description: 'Citizen account created successfully.',
        });
        return { error: null };
      } else {
        toast({
          variant: 'destructive',
          title: 'Registration Failed',
          description: data.message,
        });
        return { error: data.message };
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An error occurred during registration.',
      });
      return { error: error.message };
    }
  };

  const signOut = async () => {
    try {
      await fetch(`${API_BASE_URL}/logOut`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      // Ignore
    }
    setUser(null);
    setIsStaff(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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