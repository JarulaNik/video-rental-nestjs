import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Home from './pages/Home.jsx';
import MovieList from './pages/MovieList.jsx';
import MovieDetails from './pages/MovieDetails.jsx';
import UserProfile from './pages/UserProfile.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Cart from './pages/Cart.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, checkAuthFailure, checkAuthSuccess } from "./store/actions";
import { getUser } from './services/authService.js';
import { AuthProvider } from './context/AuthContext';
import Player from './pages/Player.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#070404',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f4f4f4',
    },
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'],
  },
});
function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    if (token) {
      getUser()
        .then(response => dispatch(checkAuthSuccess(response, token)))
        .catch(() => dispatch(checkAuthFailure()))
    } else {
      dispatch(checkAuthFailure());
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('token');
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>

        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component={Link} to="/" style={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
              ЯроФилмс
            </Typography>
            {isAuthenticated ? (
              <>
                <Button component={Link} to="/profile" color="inherit">
                  Личный кабинет
                </Button>

                <Button color="inherit" onClick={handleLogout}>
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" color="inherit">
                  Вход
                </Button>
                <Button component={Link} to="/signup" color="inherit">
                  Регистрация
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/movies/:movieId" element={<MovieDetails />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/player"
              element={isAuthenticated ? <Player /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>

        </AuthProvider>
    </ThemeProvider>
  );
}
export default App;