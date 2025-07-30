// AuthContext.js



import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // null = loading
  
  const authCheck = async () => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_APP_HOST}/user/verify`, {
        withCredentials: true
      })
      if (result.status >= 200 && result.status < 400) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error.message);
      setIsAuthenticated(null)
    }
  }
  useEffect(() => {
    // authCheck();
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}