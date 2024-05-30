import React, { useEffect, useState } from 'react';
import { Grid, Typography, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { getRentedMovies } from "../services/movieService";

const UserProfile = () => {
  const { user } = useAuth();
  const [rentedMovies, setRentedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRentedMovies = async () => {
      try {
        const rentedMoviesData = await getRentedMovies();
        setRentedMovies(rentedMoviesData);
      } catch (error) {
        console.error('Error fetching rented movies:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    // Получаем фильмы при монтировании
    fetchRentedMovies();

    // Определяем интервал обновления (например, 60 секунд)
    const updateInterval = 60000;

    // Создаем интервал для обновления списка арендованных фильмов
    const intervalId = setInterval(fetchRentedMovies, updateInterval);

    // Очищаем интервал при размонтировании компонента
    return () => clearInterval(intervalId);
  }, []);

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
        {/* ... (Информация о пользователе - без изменений) */}

        <Grid item xs={12} md={6}>
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
        </Grid>
      </Grid>
    );
  }
  return null; // Или другой компонент/сообщение, если пользователь не аутентифицирован
};

export default UserProfile;