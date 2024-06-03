
import React, { useState } from 'react';
import { Grid, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/authService';
import SignupForm from '../components/SignupForm.jsx';

const Signup = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (credentials) => {
    try {
      console.log('Data being sent:', credentials);
      const response = await signup(credentials.email, credentials.password, credentials.name);
      console.log('Data being sent:', JSON.stringify(credentials, null, 2));
      if (response.status === 201||204) {
        navigate('/login');
      } else {
        setError('Не удалось зарегистрироваться.');
      }
    } catch (error) {
      console.error('Ошибка регистрации:', error);


      if (error.response && error.response.status === 409) {
        setError('Пользователь с таким e-mail уже существует.');
      } else if (error.response && error.response.status === 401) {
        setError('Несанкционированный доступ. Проверьте свои учетные данные.');
      } else {
        setError('Произошла ошибка во время регистрации. Попробуйте еще раз позже.');
      }
    }
  };

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
      style={{ paddingTop: '50px' }}
    >
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="h5" gutterBottom>
          Регистрация
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <SignupForm onSubmit={handleSubmit} />
      </Grid>
    </Grid>
  );
};

export default Signup;