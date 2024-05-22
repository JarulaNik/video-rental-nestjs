// src/pages/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import { Grid, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { getUser } from '../services/authService';
import { getRentedMovies } from '../services/movieService';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [rentedMovies, setRentedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
        const rentedMoviesData = await getRentedMovies();
        setRentedMovies(rentedMoviesData);
      } catch (error) {
        console.error('Error fetching user data:', error);
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
        <Typography variant="h6">
          User not found. Please log in.
        </Typography>
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
          User Profile
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          User Information:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Email" secondary={user.email} />
          </ListItem>
          {/* Add other user details here */}
        </List>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Rented Movies:
        </Typography>
        <List>
          {rentedMovies.map((movie) => (
            <ListItem key={movie.id}>
              <ListItemText primary={movie.title} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default UserProfile;