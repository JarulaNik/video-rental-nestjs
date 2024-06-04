import axios from 'axios';
const apiUrl = '188.68.213.107:3000'; // Измените на ваш API URL

export const getMovies = async () => {
  const response = await axios.get(`${apiUrl}/movies`);
  // Проверяем, что response.data - это массив
  if (Array.isArray(response.data)) {
    return response.data;
  } else {
    // Обрабатываем случай, когда response.data не является массивом
    console.error('Ошибка: response.data не является массивом');
    return []; // Или вернуть пустой массив
  }
};

export const getMovieById = async (movieId) => {
  if (!validateUUID(movieId)) {
    throw new Error('Invalid UUID format');
  }
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
    if (!validateUUID(movieId)) {
      throw new Error('Invalid UUID format');
    }
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
    const response = await axios.get(`${apiUrl}/movies/rented`, {
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
  // Проверяем, что response.data - это массив
  if (Array.isArray(response.data)) {
    return response.data;
  } else {
    // Обрабатываем случай, когда response.data не является массивом
    console.error('Ошибка: response.data не является массивом');
    return []; // Или вернуть пустой массив
  }
};

// Функция для проверки формата UUID
function validateUUID(uuid) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}



