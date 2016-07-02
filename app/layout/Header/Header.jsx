import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactGravatar from 'react-gravatar';
import { userLogout } from '../../redux/auth';

class Header extends Component {
  constructor() {
    super();
  }

  handleSignOutClick(e) {
    e.preventDefault();

    const { dispatch } = this.props;

    dispatch(userLogout());
  }

  renderUser() {
    const { currentUser } = this.props;

    if (currentUser) {
      let name = currentUser.username;
      if (currentUser.display_name) {
        name = currentUser.display_name;
      }

      return (
        <ul>
          <li>
            <a className="current-user">
              <ReactGravatar email={currentUser.email} default="mm" https /> {name}
            </a>
          </li>
          <li>
            <a href="#" onClick={::this.handleSignOutClick}><i className="fa fa-sign-out" /> Logout</a>
          </li>
        </ul>
      )
    } else {
      return (
        <ul>
          <li>
            <Link to="/login"><i className="fa fa-sign-in" /> Login</Link>
          </li>
          <li>
            <Link to="/register"><i className="fa fa-sign-up" /> Register</Link>
          </li>
        </ul>
      );
    }
  }

  render() {
    return (
      <header className="main-header">
        <nav>
          <ul>
            <li>
              <Link to="/"><i className="fa fa-columns" /> Boards</Link>
            </li>
          </ul>
        </nav>
        <Link to="/">
          <span className="logo" />
        </Link>
        <nav className="right">
          {this.renderUser()}
        </nav>
      </header>
    );
  }
}

export default Header;
