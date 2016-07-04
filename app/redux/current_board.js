import { routerActions } from 'react-router-redux';

const initialState = {
  fetching: true,
  channel: null,
  connectedUsers: [],
  showUsersForm: false,
  error: null
};

export const CURRENT_BOARD_FETCHING = 'current_board_fetching';
export const CURRENT_BOARD_REQUEST = 'current_board_request';
export const CURRENT_BOARD_CHANNEL_CONNECTED = 'current_board_channel_created';
export const CURRENT_BOARD_SHOW_MEMBERS_FORM = 'current_board_show_members_form';
export const CURRENT_BOARD_ADD_MEMBER_ERROR = 'current_board_add_member_error';
export const CURRENT_BOARD_MEMBER_ADDED = 'current_board_member_added';

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

    case CURRENT_BOARD_SHOW_MEMBERS_FORM:
      return {
        ...state,
        showUsersForm: action.show
      };

    case CURRENT_BOARD_ADD_MEMBER_ERROR:
      return {
        ...state,
        error: action.error
      };

    case CURRENT_BOARD_MEMBER_ADDED:
      const { members } = state;
      members.push(action.user);

      return {
        ...state,
        members,
        showUsersForm: false
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

function addNewMemberError(error) {
  return {
    type: CURRENT_BOARD_ADD_MEMBER_ERROR,
    error
  };
}

export function showMembersForm(show) {
  return {
    type: CURRENT_BOARD_SHOW_MEMBERS_FORM,
    show
  };
}

function boardChannelMemberAdded(user) {
  return {
    type: CURRENT_BOARD_MEMBER_ADDED,
    user
  };
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

    channel.on('member:added', msg => {
      dispatch(boardChannelMemberAdded(msg.user));
    })
  }
}

export function boardChannelDisconnect() {

}

export function addNewMember(channel, email) {
  return dispatch => {
    channel.push('members:add', { email })
      .receive('error', data => {
        dispatch(addNewMemberError(data.error));
      });
  };
}
