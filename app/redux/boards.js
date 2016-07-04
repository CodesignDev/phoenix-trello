import { routerActions } from 'react-router-redux';
import axios from 'axios';

const initialState = {
  fetching: false,
  creating: false,
  ownedBoards: [],
  invitedBoards: [],
  error: null,
  showForm: false,
  formErrors: []
};

export const BOARDS_FETCHING = 'boards_fetching';
export const BOARDS_RECEIVED = 'boards_received';
export const BOARDS_ERROR = 'boards_error';
export const NEW_BOARD_CREATE_REQUEST = 'new_board_create_request';
export const NEW_BOARD_CREATED = 'new_board_created';
export const NEW_BOARD_CREATE_ERROR = 'new_board_create_error';
export const SHOW_NEW_BOARD_FORM = 'show_new_board_form';
export const BOARD_ADDED = 'board_added';

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

    case NEW_BOARD_CREATE_REQUEST:
      return {
        ...state,
        creating: true
      };

    case NEW_BOARD_CREATED:
      const { ownedBoards } = state;
      return {
        ...state,
        creating: false,
        ownedBoards: [action.board].concat(ownedBoards)
      };

    case NEW_BOARD_CREATE_ERROR:
      return {
        ...state,
        creating: false,
        formErrors: action.errors
      };

    case SHOW_NEW_BOARD_FORM:
      return {
        ...state,
        showForm: action.show
      };

    case BOARD_ADDED:
      const { invitedBoards} = state;
      return {
        ...state,
        invitedBoards: [action.board].concat(invitedBoards)
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

function createBoardFetching() {
  return {
    type: NEW_BOARD_CREATE_REQUEST
  };
}

function createBoardCreated(board) {
  return {
    type: NEW_BOARD_CREATED,
    board
  };
}

function createBoardError(errors) {
  return {
    type: NEW_BOARD_CREATE_ERROR,
    errors
  };
}

export function showForm(show) {
  return {
    type: SHOW_NEW_BOARD_FORM,
    show
  };
}

export function boardAdded(board) {
  return {
    type: BOARD_ADDED,
    board
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

export function createBoard(board) {
  return dispatch => {
    dispatch(createBoardFetching());
    axios.post('/api/v1/boards', { board })
      .then(res => {
        dispatch(createBoardCreated(res.data));
        dispatch(routerActions.push(`/boards/${res.data.id}`));
      })
      .catch(res => {
        dispatch(createBoardError(res.data));
      });
  }
}
