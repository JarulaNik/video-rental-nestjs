import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import myImage from './public/123.jpeg';
const Home = () => {
  return (
    <Grid container spacing={2} style={{
      paddingTop: '700px',
      backgroundImage: `url(${myImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }}>
      <Grid item xs={12} md={4} container justifyContent="center" alignItems="center"
            style={{
              position: 'fixed',
              left: 20,
              top: '50%',
              transform: 'translateY(-45%)',
              width: '30%',
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(1px)',
              padding: '20px',
              borderRadius: '20px'
            }}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom align="center">
            Сервис видеопроката с крупнейшей библиотекой фильмов в России
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
            Найдите фильм, который прийдётся Вам по душе, арендуйте его и наслаждайтесь
            просмотром в высоком качестве!
          </Typography>
          <Grid container justifyContent="center">
            <Button component={Link} to="/movies" variant="contained" color="primary" sx={{ borderRadius: '30px' }}>
              Найти фильм
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;