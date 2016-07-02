import { routerActions } from 'react-router-redux';
import axios from 'axios';

const initialState = {
  token: null,
  currentUser: null,
  socket: null,
  error: null
};

export const CURRENT_USER = 'current_user';
export const AUTH_TOEKN = 'auth_token';
export const AUTH_ERROR = 'auth_error';

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}

export function setCurrentUser(currentUser) {
  return {
    type: CURRENT_USER,
    currentUser
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    error
  };
}

export function userLogin(email, password) {
  return dispatch => {
    const data = {
      email,
      password
    };
    axios.post('/api/v1/auth', {auth: data})
      .then(res => {
        localStorage.setItem('token', res.data.token);
        dispatch(setCurrentUser(res.data.user));
        dispatch(routerActions.push('/'));
      })
      .catch(res => {
        dispatch(authError(res.data.error));
      });
  }
}

export function getCurrentUser() {
  return dispatch => {
    axios.get('/api/v1/users/me')
      .then(res => {
        dispatch(setCurrentUser(res.data.user));
      })
      .catch(res => {
        console.log(res.data);
        dispatch(routerActions.push('/login'));
      })
  }
}
