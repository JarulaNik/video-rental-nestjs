import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); // Добавляем состояние для ошибки

  const login = async (email, password) => {
    setError(null); // Сбрасываем ошибку перед попыткой входа
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.accessToken);
        setUser(data.user); // Сохраняем данные пользователя
        setIsAuthenticated(true);
      } else {
        const errorData = await response.json(); // Получаем данные об ошибке
        setError(errorData.message || 'Ошибка авторизации'); // Устанавливаем ошибку
      }
    } catch (error) {
      setError('Произошла ошибка при подключении к серверу.');
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    error, // Передаем ошибку в контекст
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};