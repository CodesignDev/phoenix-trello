import React, { Component } from 'react';
import { routerActions } from 'react-router-redux';

class BoardCard extends Component {
  handleClick() {
    const { dispatch, id } = this.props;

    dispatch(routerActions.push(`/boards/${id}`));
  }

  render() {
    const { id, name } = this.props;

    return (
      <div id={id} className="board" onClick={::this.handleClick}>
        <div className="inner">
          <h4>{name}</h4>
        </div>
      </div>
    );
  }
}

export default BoardCard;
