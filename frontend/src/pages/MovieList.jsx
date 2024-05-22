import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import MovieCard from '../components/MovieCard.jsx';
import { getMovies } from '../services/movieService.js';
import LoadingError from '../components/LoadingError.jsx';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={2} paddingTop={2} sx={{ paddingLeft: '20px' }}>
      <LoadingError isLoading={isLoading} error={error} /> {/* Рендерим LoadingError */}
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Список фильмов
        </Typography>
      </Grid>
      <Grid container spacing={2} justifyContent="flex-start">
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}
                sx={{ height: '350px' }}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default MovieList;