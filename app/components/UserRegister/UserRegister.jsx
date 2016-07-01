import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { userSignup } from '../../redux/registrations';

class UserRegister extends Component {
  _handleSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;

    const data = {
      username: this.refs.username.value,
      display_name: this.refs.displayName.value,
      email: this.refs.email.value,
      password: this.refs.password.value,
      password_confirmation: this.refs.passwordConfirmation.value
    };

    dispatch(userSignup(data));
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
      <div className="view-container registrations new">
        <Helmet title="Sign Up" />
        <main>
          <header>
            <div className="logo" />
          </header>
          <form onSubmit={::this._handleSubmit}>
            <div className="field">
              <input ref="username" type="text" placeholder="Username" required={true} />
              {::this.renderErrors('username')}
            </div>
            <div className="field">
              <input ref="displayName" type="text" placeholder="Display Name" required={true} />
              {::this.renderErrors('display_name')}
            </div>
            <div className="field">
              <input ref="email" type="text" placeholder="Email" required={true} />
              {::this.renderErrors('email')}
            </div>
            <div className="field">
              <input ref="password" type="password" placeholder="Password" required={true} />
              {::this.renderErrors('password')}
            </div>
            <div className="field">
              <input ref="passwordConfirmation" type="password" placeholder="Confirm password" required={true} />
              {::this.renderErrors('password_confirmation')}
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <Link to="/login">Login</Link>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.registrations.errors
});

export default connect(mapStateToProps)(UserRegister);
