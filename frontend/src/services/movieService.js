import axios from 'axios';
const apiUrl = 'http://localhost:3000'; // Измените на ваш API URL

export const getMovies = async () => {
  const response = await axios.get(`${apiUrl}/movies`);
  return response.data;
};

export const getMovieById = async (movieId) => {
  const response = await axios.get(`${apiUrl}/movies/${movieId}`);
  return response.data;
};

export const rentMovie = async (movieId, rentalPeriod) => {
  const token = localStorage.getItem('token'); // Получение токена из localStorage

  if (!token) {
    // Обработка случая, если токен отсутствует
    console.error('Токен авторизации не найден.');
    return;
  }

  try {
    const response = await axios.post(
      `${apiUrl}/movies/${movieId}/rent`,
      { rentalPeriod },
      {
        headers: { Authorization: `Bearer ${token}` }, // Передача токена
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error renting movie:', error);
    // Обработка ошибок: вы можете вывести сообщение пользователю
    // или вернуть ошибку в функцию, которая вызвала rentMovie.
    throw error; // Передача ошибки вверх по цепочке вызовов
  }
};

export const getRentedMovies = async () => {

  const token = localStorage.getItem('token');

  if (!token) {
    console.error('Токен авторизации не найден.');
    return []; // Возвращаем пустой массив, если токена нет
  }

  try {
    const response = await axios.get(`${apiUrl}/movies/rented`, { // Используйте правильный URL
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении арендованных фильмов:', error);
    throw error;
  }
};

export const searchMovies = async (searchTerm) => {
  const response = await axios.get(`${apiUrl}/movies/search?keyword=${searchTerm}`);
  return response.data;
};