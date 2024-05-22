import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const [rentError, setRentError] = useState(null); // Добавьте состояние для ошибки аренды
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMovieById(movieId);
        setMovie(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
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
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (error) {
      console.error('Error renting movie:', error);
      setRentError(error?.response?.data?.message || 'Произошла ошибка при аренде.'); // Извлечение сообщения об ошибке
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
              Genre: {movie.genre}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Release Year: {movie.releaseYear}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Description: {movie.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Rental Prices:
            </Typography>
            <ul>
              <li>24h: ${movie.rentalPrice['24h']}</li>
              <li>7d: ${movie.rentalPrice['7d']}</li>
              <li>1m: ${movie.rentalPrice['1m']}</li>
              <li>Lifetime: ${movie.rentalPrice.lifetime}</li>
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
            Rental Period
          </InputLabel>
          <Select
            labelId="rental-period-select-label"
            id="rental-period-select"
            value={rentalPeriod}
            onChange={(e) => setRentalPeriod(e.target.value)}
            label="Rental Period"
          >
            <MenuItem value="24h">24 hours</MenuItem>
            <MenuItem value="7d">7 days</MenuItem>
            <MenuItem value="1m">1 month</MenuItem>
            <MenuItem value="lifetime">Lifetime</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleRent} disabled={rentSuccess}>
          Rent Now
        </Button>
        {/* Отображаем сообщение об успешной аренде */}
        {rentSuccess && (
          <Alert severity="success" style={{ marginTop: '16px' }}>
            Фильм успешно арендован! Вы будете перенаправлены на страницу профиля.
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