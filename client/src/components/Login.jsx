import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import clipart from './assets/Daco_6019216.png';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '20ch',
    },
  },
  button: {
    width: '252px',
  }
}));

export const Login = function({ setApplicationAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsgs, setErrorMsgs] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const classes = useStyles();

  const submitLogin = function() {
    axios.post('/user/login', {
      email: email,
      password: password
    })
      .then(resVal => {
        if (resVal.data !== 'OK. Redirecting to /dashboard') {
          console.log('error');
        } else {
          setRedirect(true);
          setApplicationAuth(true);
        }
      });
  };

  return (
    <div className='login-full'>
      <br />
      <br />
      {redirect ? <Redirect to='/dashboard'/> : ''}
      <Grid className ="login-container" container direction="row" justifyContent="center">
        <Grid className="login-form-container" container direction="column" justifyContent="center">
          <Grid item spacing={3} justifyContent="center">
            <h4 className="login-form-title">Login</h4>
          </Grid>
          <Grid item spacing={2}>
            <TextField
              className="login-email-field"
              required
              id="email"
              label="Email"
              placeholder="johnDoe@email.com"
              variant="outlined"
              onChange={(event) => {
                setEmail(event.target.value);
              }}/>
          </Grid>
          <br />
          <Grid item spacing={2}>
            <TextField
              className="login-password-field"
              type="password"
              required
              id="outlined-required"
              label="password"
              variant="outlined"
              onChange={(event) => {
                setPassword(event.target.value);
              }}/>
          </Grid>
          <br />
          <Grid item spacing={2} justifyContent="center">
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={submitLogin}>
              Login
            </Button>
          </Grid>
          <br />
          <Grid item spacing={2} justifyContent="center">
            <Link to='/register'>
              <Button
                className="register-button"
                variant="contained"
                color="primary">
                Register
              </Button>
            </Link>
          </Grid>
          <br />
          <Grid item spacing={2} justifyContent="center">
            <div className='error-messages-container'>
              {errorMsgs.map(error => {
                errorID += 1;
                return <div
                  className='error-message'
                  key={errorID}>{error.msg}</div>;
              })}
            </div>
          </Grid>
        </Grid>
        <Grid item spacing={3} justifyContent="center">
          <img src={clipart} className="login-clipart" alt="Soapbox clipart bird megaphone"/>
        </Grid>
      </Grid>
    </div>
  );
};

Login.propTypes = {
  setApplicationAuth: PropTypes.func
};