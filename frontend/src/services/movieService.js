// src/services/movieService.js
import axios from 'axios';
const apiUrl = 'http://localhost:3000'; // Change to your backend API URL

export const getMovies = async () => {
  const response = await axios.get(`${apiUrl}/movies`);
  return response.data;
};

export const getMovieById = async (movieId) => {
  const response = await axios.get(`${apiUrl}/movies/${movieId}`);
  return response.data;
};

export const rentMovie = async (movieId, rentalPeriod) => {
  const response = await axios.post(
    `${apiUrl}/movies/${movieId}/rent`,
    { rentalPeriod },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }
  );
  return response.data;
};

export const getRentedMovies = async () => {
  const response = await axios.get(`${apiUrl}/users/rented`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

export const searchMovies = async (searchTerm) => {
  const response = await axios.get(`${apiUrl}/movies/search?keyword=${searchTerm}`);
  return response.data;
};