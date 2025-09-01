import { useState, useEffect } from 'react';
import { login as authLogin, logout as authLogout } from '../services/authService';
import { getAccessToken, clearAuthTokens } from '../storage/tokenStorage';
import { ILoginCredentials } from '../types/auth';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getAccessToken();
    setIsLoggedIn(!!token);
    setIsLoading(false);
  }, []);

  const login = async (credentials: ILoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      await authLogin(credentials); 
      setIsLoggedIn(true);
      
    } catch (err: any) {
      setError(err.message || 'Fallo en la autenticación');
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authLogout(); 
    clearAuthTokens(); 
    setIsLoggedIn(false);
  };

  return { isLoggedIn, isLoading, error, login, logout };
};