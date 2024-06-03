// UserProfile.jsx
import React, { useEffect, useState } from 'react';
import { Grid, Typography, List, ListItem, ListItemText, CircularProgress, Alert, Avatar, Card, CardContent, CardHeader, CardActions, Button } from '@mui/material';
import { getUser } from '../services/authService';
import './Profile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
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

  if (!user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Alert severity="error">Пользователь не найден. Пожалуйста, войдите в систему.</Alert>
      </div>
    );
  }

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center" style={{ paddingTop: '50px' }}>
      <Grid item xs={12} md={6}>
        <Card sx={{ borderRadius: '16px' }}> {/* Добавляем borderRadius */}
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: 'red' }}>
                {user.email.charAt(0).toUpperCase()}
              </Avatar>
            }
            title="Профиль Пользователя"
            action={
              <Button variant="contained" color="primary" href="/" sx={{ borderRadius: '8px' }}> {/* Добавляем borderRadius */}
                Назад
              </Button>
            }
          />
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Информация о Пользователе:
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Email:" secondary={user.email} />
              </ListItem>
              {/* Добавьте сюда другие детали пользователя */}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserProfile;