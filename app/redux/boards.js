import axios from 'axios';

const initialState = {
  fetching: false,
  ownedBoards: [],
  error: null
};

export const BOARDS_FETCHING = 'boards_fetching';
export const BOARDS_RECEIVED = 'boards_received';
export const BOARDS_ERROR = 'boards_error';

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case BOARDS_FETCHING:
      return {
        ...state,
        fetching: true
      };

    case BOARDS_RECEIVED:
      return {
        ...state,
        fetching: false,
        ownedBoards: action.ownedBoards
      };

    case BOARDS_ERROR:
      return {
        ...state,
        error: action.error
      };

    default:
      return state;
  }
}

function boardsFetching() {
  return {
    type: BOARDS_FETCHING
  };
}

function boardsReceived(ownedBoards) {
  return {
    type: BOARDS_RECEIVED,
    ownedBoards
  };
}

function boardsReceiveError(error) {
  return {
    type: BOARDS_ERROR,
    error
  };
}

export function fetchBoards() {
  return dispatch => {
    dispatch(boardsFetching());

    axios.get('/api/v1/boards')
      .then(res => {
        dispatch(boardsReceived(res.data.owned_boards));
      })
      .catch(res => {
        dispatch(boardsReceiveError(res.data));
      });
  }
}
