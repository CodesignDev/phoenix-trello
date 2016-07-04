import React, { Component } from 'react';
import { connect } from 'react-redux';
import BoardMembers from '../../components/Boards/Members';
import { boardChannelConnect, boardChannelDisconnect } from '../../redux/current_board';

class BoardView extends Component {
  componentDidMount() {
    const { dispatch, params: { id }, socket } = this.props;

    if (!socket) {
      return false;
    }

    dispatch(boardChannelConnect(socket, id));
  }

  componentWillUpdate(nextProps) {
    const { dispatch, socket, params: { id } } = this.props;

    if (socket) {
      return false;
    }

    dispatch(boardChannelConnect(nextProps.socket, id));
  }

  componentWillUnmount() {
    const { dispatch, currentBoard: { channel } } = this.props;

    dispatch(boardChannelDisconnect(channel));
  }

  renderMembers() {
    const { dispatch, currentUser } = this.props;
    const { user, members, connectedUsers, showUsersForm, channel, error } = this.props.currentBoard;
    // const currentUserIsOwner = this.props.currentBoard.user.id === this.props.currentUser.id;
    const currentUserIsOwner = user.id === currentUser.id;

    return (
      <BoardMembers
        dispatch={dispatch}
        members={members}
        connectedUsers={connectedUsers}
        currentUserIsOwner={currentUserIsOwner}
        channel={channel}
        error={error}
        show={showUsersForm} />
    );
  }

  render() {
    const { fetching, name } = this.props.currentBoard;

    if (fetching) {
      return (
        <div className="view-container boards show">
          <i className="fa fa-spinner fa-spin" />
        </div>
      );
    }

    return (
      <div className="view-container boards show">
        <header className="view-header">
          <h3>{name}</h3>
          {::this.renderMembers()}
        </header>
        <div className="canvas-wrapper">
          <div className="canvas">
            <div className="lists-wrapper">
              {/*{::this.renderAddNewList()}*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentBoard: state.currentBoard,
  currentUser: state.auth.currentUser,
  socket: state.auth.socket
});

export default connect(mapStateToProps)(BoardView);
