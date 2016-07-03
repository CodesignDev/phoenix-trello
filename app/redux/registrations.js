import { routerActions } from 'react-router-redux';
import axios from 'axios';
import { setCurrentUser } from './auth';

const initialState = {
  errors: null
};

export const REGISTRATIONS_ERROR = 'registrations_error';

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REGISTRATIONS_ERROR:
      return {
        ...state,
        errors: action.errors
      };
    default:
      return state;
  }
}

export function userSignup(data = null) {
  return dispatch => {
    axios.post('/api/v1/users', {user: data})
      .then((res) => {
        localStorage.setItem('token', res.data.jwt);
        axios.defaults.headers.common['Authorization'] = res.data.jwt;

        dispatch(setCurrentUser(res.data.user));

        dispatch(routerActions.push('/'));
      })
      .catch((res) => {
        dispatch(registrationErrors(res.data.errors));
      });

  }
};

function registrationErrors(errors) {
  return {
    type: REGISTRATIONS_ERROR,
    errors
  };
}

