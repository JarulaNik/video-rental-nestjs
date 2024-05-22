// src/pages/Login.jsx
import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import LoginForm from '../components/LoginForm.jsx';

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (credentials) => {
    try {
      await login(credentials.email, credentials.password);
      navigate('/'); // Redirect to home page after successful login
    } catch (error) {
      setError(error.response.data.message);
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