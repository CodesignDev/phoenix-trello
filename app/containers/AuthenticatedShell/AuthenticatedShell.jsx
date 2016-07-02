import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { getCurrentUser } from '../../redux/auth';

class AuthenticatedShell extends Component {
  componentDidMount() {
    const { dispatch, currentUser } = this.props;
    const token = localStorage.getItem('token');

    if (token && !currentUser) {
      dispatch(getCurrentUser());
    } else if (!token) {
      dispatch(routerActions.push('/login'));
    }
  }

  render() {
    const { children, currentUser } = this.props;

    if (!currentUser) return false;

    return (
      <div className="main-container">
        {children}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(AuthenticatedShell);
