import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Profile.css'; // Добавьте стили при необходимости

const Profile = () => {
  const { logout, deleteAccount } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Вы уверены, что хотите удалить аккаунт?')) {
      await deleteAccount();
      navigate('/login');
    }
  };

  return (
    <div className="profile-container">
      <h2>Личный кабинет</h2>
      <button onClick={handleLogout}>Выйти</button>
      <button onClick={handleDeleteAccount}>Удалить аккаунт</button>
    </div>
  );
};

export default Profile;