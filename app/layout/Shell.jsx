import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from './Header/Header';

/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
 */
class Shell extends Component {
  render() {
    const { children, currentUser, dispatch } = this.props;
    return (
      <div className="shell">
        <header>
          <Header
            currentUser={currentUser}
            dispatch={dispatch}
            />
        </header>
        <div className="app-container">
         {children}
        </div>
      </div>
    );
  }
}

Shell.propTypes = {
  children: PropTypes.object
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(Shell);
