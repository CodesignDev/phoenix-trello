import { routerActions } from 'react-router-redux';
import { Socket } from 'phoenix';
import url from 'url';
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
export const AUTH_LOGOUT = 'auth_logout';
export const SOCKET_CONNECTED = 'socket_connected';

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
    case AUTH_LOGOUT:
      return initialState;
    case SOCKET_CONNECTED:
      return {
        ...state,
        socket: action.socket,
        channel: action.channel
      };
    default:
      return state;
  }
}

function authSetUser(currentUser) {
  return {
    type: CURRENT_USER,
    currentUser
  };
}

function authSetSocket(socket, channel) {
  return {
    type: SOCKET_CONNECTED,
    socket,
    channel
  };
}

function authError(error) {
  return {
    type: AUTH_ERROR,
    error
  };
}

function authLogout() {
  return {
    type: AUTH_LOGOUT
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
        axios.defaults.headers.common['Authorization'] = res.data.token;
        dispatch(setCurrentUser(res.data.user));
        dispatch(routerActions.push('/'));
      })
      .catch(res => {
        dispatch(authError(res.data.error));
      });
  }
}

export function setCurrentUser(user) {
  return dispatch => {
    dispatch(authSetUser(user));

    const { hostname, port } = url.parse(axios.defaults.baseURL);
    const socketURL = {
      protocol: 'ws',
      pathname: 'socket',
      hostname,
      port,
      slashes: true
    };

    const socket = new Socket(url.format(socketURL), {
      params: { token: localStorage.getItem('token') },
    });

    socket.connect();

    const channel = socket.channel(`user:${user.id}`);

    channel.join()
      .receive('ok', () => {
        dispatch(authSetSocket(socket, channel));
      });
  }
}

export function userLogout() {
  return dispatch => {
    axios.delete('/api/v1/auth')
      .then(() => {
        localStorage.removeItem('token');

        dispatch(authLogout());
        dispatch(routerActions.push('/login'));
      })
      .catch(res => {
        console.log(res.data);
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
