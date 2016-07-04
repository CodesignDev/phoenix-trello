import React, { Component } from 'react';
import ReactGravatar from 'react-gravatar';
import classnames from 'classnames';
import { ReactPageClick } from 'react-page-click';
import { showMembersForm, addNewMember } from '../../redux/current_board';

class BoardMembers extends Component {
  handleAddNewClick(e) {
    e.preventDefault();

    const { dispatch } = this.props;

    dispatch(showMembersForm(true));
  }

  handleCancelClick(e) {
    e.preventDefault();

    const { dispatch } = this.props;

    dispatch(showMembersForm(false));
  }

  handleSubmit(e) {
    e.preventDefault();

    const { dispatch, channel } = this.props;
    const { email } = this.refs;

    dispatch(addNewMember(channel, email.value));
  }

  renderUsers() {
    const { members, connectedUsers } = this.props;

    return members.map(member => {
      const index = connectedUsers.findIndex(cu => {
        return cu === member.id;
      });

      const classes = classnames({
        connected: index != -1
      });

      return (
        <li className={classes} key={member.id}>
          <ReactGravatar className="react-gravatar" email={member.email} default="mm" https />
        </li>
      );
    });
  }

  renderAddNewUser() {
    if (!this.props.currentUserIsOwner) return false;

    return (
      <li>
        <a onClick={::this.handleAddNewClick} className="add-new" href="#"><i className="fa fa-plus" /> Add</a>
        {::this.renderForm()}
      </li>
    );
  }

  renderForm() {
    if (!this.props.show) return false;

    return (
      <ReactPageClick notify={::this.handleCancelClick}>
        <ul className="drop-down active">
          <li>
            <form onSubmit={::this.handleSubmit}>
              <h4>Add new members</h4>
              {::this.renderFormErrors()}
              <input ref="email" type="email" placeholder="Member Email" required={true} />
              <button type="submit">Add member</button> or <a onClick={::this.handleCancelClick} href="#">cancel</a>
            </form>
          </li>
        </ul>
      </ReactPageClick>
    );
  }

  renderFormErrors() {
    const { error } = this.props;

    if (!error) return false;

    return (
      <div className="error">
        {error}
      </div>
    );
  }

  render() {
    return (
      <ul className="board-users">
        {::this.renderUsers()}
        {::this.renderAddNewUser()}
      </ul>
    )
  }
}

export default BoardMembers;
