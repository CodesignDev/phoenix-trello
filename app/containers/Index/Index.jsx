import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import classnames from 'classnames';
import BoardCard from '../../components/Boards/Card';
import BoardForm from '../../components/Boards/Form';
import { fetchBoards, showForm } from '../../redux/boards';

class Index extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchBoards());
  }

  handleAddButtonClick() {
    const { dispatch } = this.props;

    dispatch(showForm(true));
  }

  handleCancelClick() {
    const { dispatch } = this.props;

    dispatch(showForm(false));
  }

  renderOwnedBoards() {
    const { fetching } = this.props;

    const iconClasses = classnames({
      fa: true,
      'fa-user': !fetching,
      'fa-spinner': fetching,
      'fa-spin': fetching
    });

    return (
      <section>
        <header className="view-header">
          <h3><i className={iconClasses} /> My boards</h3>
        </header>
        {::this.renderBoardsList()}
      </section>
    );
  }

  renderBoardsList() {
    const { fetching, ownedBoards } = this.props;

    if (fetching) return false;

    return (
      <div className="boards-wrapper">
        {::this.renderBoards(ownedBoards)}
        {::this.renderAddBoard()}
      </div>
    );
  }

  renderBoards(boards) {
    const { dispatch } = this.props;

    return boards.map((board) => {
      return (
        <BoardCard
          key={board.id}
          dispatch={dispatch}
          {...board} />
      );
    });
  }

  renderAddBoard() {
    const { dispatch, showForm, formErrors } = this.props;

    if (!showForm) return this.renderAddButton();

    return (
      <BoardForm
        dispatch={dispatch}
        errors={formErrors}
        onCancelClick={::this.handleCancelClick} />
    );
  }

  renderAddButton() {
    return (
      <div className="board add-new" onClick={::this.handleAddButtonClick}>
        <div className="inner">
          <a id="add_new_board">Add new board...</a>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="view-container boards index">
        <Helmet title="Boards" />
        {::this.renderOwnedBoards()}
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  state.boards
);

export default connect(mapStateToProps)(Index);
