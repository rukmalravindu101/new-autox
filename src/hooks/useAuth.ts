import { useState, useEffect } from 'react';
import { User } from '../types';
import { STORAGE_KEYS } from '../utils/constants';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on component mount
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    const storedToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

    if (storedUser && storedToken) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem(STORAGE_KEYS.USER_DATA);
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = (userData: User, token?: string) => {
    setUser(userData);
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
    
    if (token) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  };

  const updateUser = (updatedData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updatedData };
      setUser(updatedUser);
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(updatedUser));
    }
  };

  const getAuthToken = (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  };

  return {
    user,
    isLoading,
    login,
    logout,
    updateUser,
    getAuthToken,
    isAuthenticated: !!user
  };
};