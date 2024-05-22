// src/store/actions.js
import { signup, login, getUser } from '../services/authService';

// Signup Actions
export const signupSuccess = (user, token) => ({
  type: 'SIGNUP_SUCCESS',
  payload: { user, token },
});

export const signupFailure = (error) => ({
  type: 'SIGNUP_FAILURE',
  payload: error,
});

export const signupUser = (email, password, name) => async (dispatch) => {
  try {
    const response = await signup(email, password, name);
    dispatch(signupSuccess(response.user, response.token));
  } catch (error) {
    dispatch(signupFailure(error));
  }
};

// Login Actions
export const loginSuccess = (user, token) => ({
  type: 'LOGIN_SUCCESS',
  payload: { user, token },
});

export const loginFailure = (error) => ({
  type: 'LOGIN_FAILURE',
  payload: error,
});

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await login(email, password);
    dispatch(loginSuccess(response.user, response.token));
    localStorage.setItem('token', response.token);
  } catch (error) {
    dispatch(loginFailure(error));
  }
};

export const logoutUser = () => ({
  type: 'LOGOUT',
});

export const checkAuthSuccess = (user, token) => ({
  type: 'CHECK_AUTH_SUCCESS',
  payload: { user, token },
});

export const checkAuthFailure = () => ({
  type: 'CHECK_AUTH_FAILURE',
});

export const checkAuth = () => async (dispatch) => {
  const token = localStorage.getItem('token'); // Retrieve token from local storage
  if (token) {
    try {
      const response = await getUser();
      dispatch(checkAuthSuccess(response, token));
    } catch (error) {
      dispatch(checkAuthFailure());
    }
  } else {
    dispatch(checkAuthFailure());
  }
};