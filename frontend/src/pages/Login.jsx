// src/pages/Login.jsx
import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm.jsx';
import { useDispatch } from 'react-redux';
import { loginFailure, loginSuccess } from '../store/actions.js'
import { login } from '../services/authService.js';

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSubmit = async (credentials) => {
    try {
      const response = await login(credentials.email, credentials.password);
      dispatch(loginSuccess(response.user, response.accessToken));
      localStorage.setItem('token', response.accessToken);
      navigate('/movies');
    } catch (error) {
      console.error(error)
      dispatch(loginFailure(error));
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
          Вход
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <LoginForm onSubmit={handleSubmit} />
      </Grid>
    </Grid>
  );
};

export default Login;