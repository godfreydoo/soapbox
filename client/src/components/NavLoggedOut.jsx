import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const NavLoggedOut = function() {
  const classes = useStyles();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography edge="start" variant="h6" className={classes.title}>
            <Link
              className='nav-link'
              to='/login'>
              <Button color="inherit">Soap Box</Button>
            </Link>
          </Typography>
          <Link
            className='nav-link'
            to='/login'
            onClick={() => {
              axios.get('/auth/twitter/logout');
            }}>
            <Button color="inherit">Login</Button>
          </Link>
          <Link
            className='nav-link'
            to='/register'
            onClick={() => {
              axios.get('/auth/twitter/logout');
            }}>
            <Button color="inherit">Register</Button>
          </Link>
        </Toolbar>
      </AppBar>

      {/* <nav className='navigation-container'>
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
      </nav> */}
    </>
  );
};