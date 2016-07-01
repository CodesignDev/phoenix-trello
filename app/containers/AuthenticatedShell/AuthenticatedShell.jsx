import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';

class AuthenticatedShell extends Component {
  componentDidMount() {
    const { dispatch, currentUser } = this.props;

    if (localStorage.getItem('token')) {
      dispatch(getCurrentUser());
    } else {
      dispatch(routerActions.push('/login'));
    }
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        {children}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(AuthenticatedShell);
