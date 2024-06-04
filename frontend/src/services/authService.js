import axios from 'axios';

const apiUrl = '188.68.213.107:3000' ;

export const signup = async (email, password) => {
  const response = await axios.post(`${apiUrl}/auth/signup`, { email, password });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(`${apiUrl}/auth/login`, { email, password });
  return response.data;
};

export const getUser = async () => {
  const response = await axios.get(`${apiUrl}/auth/profile`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};