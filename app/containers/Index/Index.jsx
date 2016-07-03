import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import classnames from 'classnames';
import { fetchBoards } from '../../redux/boards';

class Index extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchBoards());
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
        {ownedBoards.map((board) => <span key={board.id}>{board.name}</span>)}
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
