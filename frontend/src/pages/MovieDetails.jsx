import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import { getMovieById, rentMovie } from '../services/movieService';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rentalPeriod, setRentalPeriod] = useState('24h');
  const [rentSuccess, setRentSuccess] = useState(false);
  const [rentError, setRentError] = useState(null);
  const navigate = useNavigate();
  const [isRentedByUser, setIsRentedByUser] = useState(false);
  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMovieById(movieId);
        setMovie(data);

        // Проверяем статус аренды после загрузки фильма
        const rentedMoviesFromStorage = localStorage.getItem('rentedMovies');
        const rentedMovieIds = rentedMoviesFromStorage ? JSON.parse(rentedMoviesFromStorage) : [];
        setIsRentedByUser(rentedMovieIds.includes(movieId));

      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

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

  const handleRent = async () => {
    try {
      await rentMovie(movieId, rentalPeriod);
      setRentSuccess(true);

      // После успешной аренды обновляем localStorage и состояние
      const rentedMoviesFromStorage = localStorage.getItem('rentedMovies');
      const updatedRentedMovies = rentedMoviesFromStorage
        ? [...JSON.parse(rentedMoviesFromStorage), movie.id]
        : [movie.id];
      localStorage.setItem('rentedMovies', JSON.stringify(updatedRentedMovies));
      setIsRentedByUser(true);

      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (error) {
      console.error('Error renting movie:', error);
      setRentError(error?.response?.data?.message || 'Произошла ошибка при аренде.');
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
      <Grid item xs={12} md={8}>
        <Card>
          <CardMedia
            component="img"
            height="400"
            image={movie.imageUrl}
            alt={movie.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {movie.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Жанр фильма: {movie.genre}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Год выпуска: {movie.releaseYear}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Описание: {movie.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Стоимость:
            </Typography>
            <ul>
              <li>Сутки: ${movie.rentalPrice['24h']}</li>
              <li>Неделя: ${movie.rentalPrice['7d']}</li>
              <li>Месяц: ${movie.rentalPrice['1m']}</li>
              <li>Навсегда: ${movie.rentalPrice.lifetime}</li>
            </ul>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl
          fullWidth
          variant="outlined"
          style={{ marginBottom: '16px' }}
        >
          <InputLabel id="rental-period-select-label">
            Срок аренды
          </InputLabel>
          <Select
            labelId="rental-period-select-label"
            id="rental-period-select"
            value={rentalPeriod}
            onChange={(e) => setRentalPeriod(e.target.value)}
            label="Rental Period"
          >
            <MenuItem value="24h">Сутки</MenuItem>
            <MenuItem value="7d">Неделя</MenuItem>
            <MenuItem value="1m">Месяц</MenuItem>
            <MenuItem value="lifetime">Навсегда</MenuItem>
          </Select>
        </FormControl>
        {isAuthenticated ? (
          <Button
            variant="contained"
            color={isRentedByUser ? 'inherit' : 'primary'}
            onClick={handleRent}
            disabled={rentSuccess || isRentedByUser}
          >
            {isRentedByUser ? 'Оплачен' : 'Оплатить'}
          </Button>
        ) : (
          <Button component={Link} to="/login" variant="contained" color="primary">
            Войти, чтобы арендовать
          </Button>
        )}
        {/* Отображаем сообщение об успешной аренде */}
        {rentSuccess && (
          <Alert severity="success" style={{ marginTop: '16px' }}>
            Фильм успешно арендован! Наслаждайтесь просмотром с ЯроФилмс
          </Alert>
        )}
        {/* Отображаем сообщение об ошибке аренды */}

        {rentError && (
          <Alert severity="error" style={{ marginTop: '16px' }}>
            {rentError}
          </Alert>
        )}
      </Grid>
    </Grid>
  );
};

export default MovieDetails;