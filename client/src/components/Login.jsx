import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  button: {
    width: '30ch',
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
    <>
      <br />
      <br />
      {redirect ? <Redirect to='/dashboard'/> : ''}
      <Grid container direction="column" justifyContent="center">
        <Grid item>
          <TextField
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
        <Grid item>
          <TextField
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
        <Grid item>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={submitLogin}>
            Login
          </Button>
        </Grid>

      </Grid>
      <div className='error-messages-container'>
        {errorMsgs.map(error => {
          errorID += 1;
          return <div
            className='error-message'
            key={errorID}>{error.msg}</div>;
        })}
      </div>

      {/* <div className='login-container'>
        {redirect ? <Redirect to='/dashboard'/> : ''}
        <h2 className='login-title'>Login</h2>
        <div className="login-form">
          <label>Email: </label>
          <input
            type="email"
            id="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}></input>
          <label>Password: </label>
          <input
            type="password"
            id="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}></input>
          <button
            onClick={() => {
              submitLogin();
            }}>Login</button>
        </div>
        <div className='error-messages-container'>
          {errorMsgs.map(error => {
            errorID += 1;
            return <div
              className='error-message'
              key={errorID}>{error.msg}</div>;
          })}
        </div>
      </div> */}
    </>
  );
};

Login.propTypes = {
  setApplicationAuth: PropTypes.func
};