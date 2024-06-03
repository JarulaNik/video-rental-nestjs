import React, { useEffect, useState } from 'react';
import { Grid, Typography, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { getRentedMovies } from "../services/movieService";

const UserProfile = () => {
  const { user } = useAuth();
  const [rentedMovies, setRentedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Убираем код, связанный с получением и отображением арендованных фильмов
  // ...

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
        <Alert severity="error">{String(error)}</Alert>
      </div>
    );
  }

  if (user) {
    return (
      <Grid container spacing={2} alignItems="center" justifyContent="center" style={{ paddingTop: '50px' }}>
        {/* Убираем секцию с арендованными фильмами */}
        {/* <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Арендованные Фильмы:
          </Typography>
          {rentedMovies.length > 0 ? (
            <List>
              {rentedMovies.map((movie) => (
                <ListItem key={movie.id}>
                  <ListItemText primary={movie.title} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1" gutterBottom>
              Нет арендованных фильмов.
            </Typography>
          )}
        </Grid> */}
      </Grid>
    );
  }
  return null;
};

export default UserProfile;