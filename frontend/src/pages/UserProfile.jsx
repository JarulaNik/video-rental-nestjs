import React, { useEffect, useState } from 'react';
import { Grid, Typography, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';
import { getUser } from '../services/authService';
import { getRentedMovies } from '../services/movieService';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [rentedMovies, setRentedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
        const rentedMoviesData = await getRentedMovies();
        setRentedMovies(rentedMoviesData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Alert severity="error">
          {error}
        </Alert>
      </div>
    );
  }

  if (!user) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Alert severity="error">
          Пользователь не найден. Пожалуйста, войдите в систему.
        </Alert>
      </div>
    );
  }

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
      style={{ paddingTop: '50px' }}
    >
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Профиль Пользователя
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom>
          Информация о Пользователе:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Email:" secondary={user.email} />
          </ListItem>
          {/* Добавьте сюда другие детали пользователя */}
        </List>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom>
          Арендованные Фильмы:
        </Typography>
        <List>
          {rentedMovies.length > 0 ? (
            rentedMovies.map((movie) => (
              <ListItem key={movie.id}>
                <ListItemText primary={movie.title} />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="Нет арендованных фильмов." />
            </ListItem>
          )}
        </List>
      </Grid>
    </Grid>
  );
};

export default UserProfile;