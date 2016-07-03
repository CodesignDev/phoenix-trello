import React, { Component } from 'react';
import { ReactPageClick } from 'react-page-click';
import { createBoard } from '../../redux/boards';

class BoardForm extends Component {
  componentDidMount() {
    this.refs.name.focus();
  }

  handleSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    const { name } = this.refs;

    const data = {
      name: name.value,
    };

    dispatch(createBoard(data));
  }

  handleCancelClick(e) {
    e.preventDefault();

    this.props.onCancelClick();
  }

  renderErrors(ref) {
    const { errors } = this.props;

    if (!errors) return false;

    return errors.map((error, i) => {
      if (error[ref]) {
        return (
          <div key={i} className="error">
               {error[ref]}
          </div>
        );
      }
    });
  }

  render() {
    return (
      <ReactPageClick notify={::this.handleCancelClick}>
        <div className="board form">
          <div className="inner">
            <h4>New Board</h4>
            <form id="new_board_form" onSubmit={::this.handleSubmit}>
              <input ref="name" id="board_new" type="text" placeholder="Board Name" required={true} />
              {this.renderErrors('name')}
              <button type="submit">Create board</button> or <a href="#" onClick={::this.handleCancelClick}>cancel</a>
            </form>
          </div>
        </div>
      </ReactPageClick>
    );
  }
}

export default BoardForm;
