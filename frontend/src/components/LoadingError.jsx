import React from 'react';
import { Grid, Typography, CircularProgress } from '@mui/material';

const LoadingError = ({ isLoading, error }) => {
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h5">Произошла ошибка при загрузке списка фильмов. Попробуйте ещё раз позднее.</Typography>
      </div>
    );
  }

  return null; // Если нет ни загрузки, ни ошибки, возвращаем null
};

export default LoadingError;