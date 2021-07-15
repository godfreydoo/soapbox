import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const NavLoggedOut = function() {
  return (
    <nav className='navigation-container'>
      <Link
        className='nav-link'
        to='/login'>
        <h3>Soapbox</h3>
      </Link>
      <ul className='navigation-links'>
        <Link
          className='nav-link'
          to='/login'>
          <li>Login</li>
        </Link>
        <Link
          className='nav-link'
          to='/register'>
          <li>Register</li>
        </Link>
      </ul>
    </nav>
  );
};