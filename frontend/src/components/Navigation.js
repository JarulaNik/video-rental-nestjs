import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navigation.css'; // Добавьте стили при необходимости

const Navigation = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/">Главная</Link>
        </li>
        {!isAuthenticated && (
          <>
            <li>
              <Link to="/login">Вход</Link>
            </li>
            <li>
              <Link to="/register">Регистрация</Link>
            </li>
          </>
        )}
        {isAuthenticated && (
          <li>
            <Link to="/profile">Личный кабинет</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;