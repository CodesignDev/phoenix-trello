import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { userLogin } from '../../redux/auth';

class UserLogin extends Component {
  _handleSubmit(e) {
    e.preventDefault();

    const { email, password } = this.refs;
    const { dispatch } = this.props;

    dispatch(userLogin(email.value, password.value));
  }

  renderError() {
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
      <div className="view-container auth new">
        <Helmet title="Sign In" />
        <main>
          <header>
            <div className="logo" />
          </header>
          <form onSubmit={::this._handleSubmit}>
            {::this.renderError()}
            <div className="field">
              <input ref="email" type="email" placeholder="Email" required={true} />
            </div>
            <div className="field">
              <input ref="password" type="password" placeholder="Password" required={true} />
            </div>
            <button type="submit">Login</button>
          </form>
          <Link to="/register">Sign Up</Link>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  state.auth
);

export default connect(mapStateToProps)(UserLogin)
