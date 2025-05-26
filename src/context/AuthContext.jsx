import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    token: '',
    isAuthenticated: false,
    loading: true
  });

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      
      if (token && user) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setAuthState({
          user,
          token,
          isAuthenticated: true,
          loading: false
        });
      } else {
        setAuthState(prev => ({ ...prev, loading: false }));
      }
    };

    initializeAuth();
  }, []);

  // Register user
  const register = async (userData) => {
    try {
      const { data } = await axios.post('https://hospitalmanagement-ocj3.onrender.com/api/auth/register', userData);
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
        specialization: data.specialization
      }));
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      
      setAuthState({
        user: {
          id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
          specialization: data.specialization
        },
        token: data.token,
        isAuthenticated: true,
        loading: false
      });
      
      toast.success('Registration successful!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      return false;
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      const { data } = await axios.post('https://hospitalmanagement-ocj3.onrender.com/api/auth/login', credentials);
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
        specialization: data.specialization
      }));
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      
      setAuthState({
        user: {
          id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
          specialization: data.specialization
        },
        token: data.token,
        isAuthenticated: true,
        loading: false
      });
      
      toast.success('Login successful!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return false;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setAuthState({
      user: null,
      token: '',
      isAuthenticated: false,
      loading: false
    });
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      register,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);