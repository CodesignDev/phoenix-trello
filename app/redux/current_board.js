import { routerActions } from 'react-router-redux';

const initialState = {
  fetching: false,
  channel: null
};

export const CURRENT_BOARD_FETCHING = 'current_board_fetching';
export const CURRENT_BOARD_REQUEST = 'current_board_request';
export const CURRENT_BOARD_CHANNEL_CONNECTED = 'current_board_channel_created';

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CURRENT_BOARD_FETCHING:
      return {
        ...state,
        fetching: true,
      };

    case CURRENT_BOARD_REQUEST:
      return {
        ...state,
        fetching: false,
        ...action.board
      };

    case CURRENT_BOARD_CHANNEL_CONNECTED:
      return {
        ...state,
        channel: action.channel
      };

    default:
      return state;
  }
}

function currentBoardFetching() {
  return {
    type: CURRENT_BOARD_FETCHING
  };
}

function currentBoardReceived(board) {
  return {
    type: CURRENT_BOARD_REQUEST,
    board
  }
}

function currentBoardChannelConnected(channel) {
  return {
    type: CURRENT_BOARD_CHANNEL_CONNECTED,
    channel
  }
}

export function boardChannelConnect(socket, boardId) {
  return (dispatch) => {
    const channel = socket.channel(`board:${boardId}`);

    dispatch(currentBoardFetching());

    channel.join()
      .receive('ok', res => {
        dispatch(currentBoardReceived(res.board));
        dispatch(currentBoardChannelConnected(channel));
      });
  }
}
