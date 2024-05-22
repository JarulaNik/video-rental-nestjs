import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { searchMovies } from '../services/movieService';

const SearchForm = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const results = await searchMovies(searchTerm);
    onSearch(results);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={8}>
          <TextField
            label="Поиск фильмов"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Button type="submit" variant="contained" color="primary">
            Найти
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SearchForm;