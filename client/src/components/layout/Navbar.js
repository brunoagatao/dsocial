import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends React.PureComponent {
  onLogoutClick = (e) => {
    e.preventDefault();

    const {
      logoutUser,
      clearCurrentProfile
    } = this.props;

    clearCurrentProfile();
    logoutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className='navbar-nav ml-auto'>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className='nav-item'>
          <a
            href=''
            className='nav-link'
            onClick={this.onLogoutClick}
          >
            <img
              className='rounded-circle'
              src={user.avatar}
              alt={user.name}
              title='You must have a Gravatar connected to yout email to display an image'
              style={{ width: '25px', marginRight: '5px' }}
            />
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link className='nav-link' to='/register'>
            Sign Up
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/login'>
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className='navbar navbar-expand-sm navbar-dark bg-dark mb-4'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            dSocial
          </Link>
          <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#mobile-nav'>
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='collapse navbar-collapse' id='mobile-nav'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>
                <Link className='nav-link' to='/profiles'>Developers</Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  };
};

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
  clearCurrentProfile: () => dispatch(clearCurrentProfile())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);