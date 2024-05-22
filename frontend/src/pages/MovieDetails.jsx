// src/pages/MovieDetails.jsx
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
} from '@mui/material';
import { getMovieById, rentMovie } from '../services/movieService';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rentalPeriod, setRentalPeriod] = useState('24h');
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
        <Typography variant="h6">
          Произошла ошибка при загрузке списка фильмов. Попробуйте позже.
        </Typography>
      </div>
    );
  }

  const handleRent = async () => {
    try {
      await rentMovie(movieId, rentalPeriod);
      navigate('/profile'); // Redirect to profile page after renting
    } catch (error) {
      console.error('Error renting movie:', error);
      // Handle error appropriately (e.g., display error message)
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
      <Grid item xs={12}>
        <Card>
          <CardMedia
            component="img"
            height="400"
            image={movie.imageUrl}
            alt={movie.title}
          />
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {movie.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Genre: {movie.genre}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Release Year: {movie.releaseYear}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Description: {movie.description}
            </Typography>
            {/* Add rental prices here */}
            <Typography variant="body1" gutterBottom>
              Rental Prices:
              <ul>
                <li>24h: ${movie.rentalPrice['24h']}</li>
                <li>7d: ${movie.rentalPrice['7d']}</li>
                <li>1m: ${movie.rentalPrice['1m']}</li>
                <li>Lifetime: ${movie.rentalPrice.lifetime}</li>
              </ul>
            </Typography>
            <FormControl
              fullWidth
              variant="outlined"
              style={{ marginBottom: '16px' }}
            >
              <InputLabel htmlFor="rental-period-select">
                Rental Period
              </InputLabel>
              <Select
                labelId="rental-period-select"
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleRent}
            >
              Rent Now
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MovieDetails;