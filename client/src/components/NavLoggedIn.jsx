import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

export const NavLoggedIn = function({ setApplicationAuth }) {
  return (
    <nav className='navigation-container'>
      <Link
        className='nav-link'
        to='/dashboard'>
        <h3>Soapbox</h3>
      </Link>
      <ul className='navigation-links'>
        <Link
          className='nav-link'
          to='/login'
          onClick={() => {
            setApplicationAuth(false);
            axios.get('/auth/twitter/logout');
          }}>
          <li>Logout</li>
        </Link>
      </ul>
    </nav>
  );
};

NavLoggedIn.propTypes = {
  setApplicationAuth: PropTypes.func
};