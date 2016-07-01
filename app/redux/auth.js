const initialState = {
  token: null,
  currentUser: null,
  socket: null,
  error: null
};

export const CURRENT_USER = 'current_user';
export const AUTH_TOEKN = 'auth_token';

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser
      }
  }
  return state;
}

export function setCurrentUser(currentUser) {
  return {
    type: CURRENT_USER,
    currentUser
  };
}
