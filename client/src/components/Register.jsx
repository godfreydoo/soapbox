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

let errorID = 0;

export const Register = function() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [twitterUsername, setTwitterUsername] = useState('');
  const [youtubeUsername, setYoutubeUsername] = useState('');
  const [errorMsgs, setErrorMsgs] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const classes = useStyles();

  const submitForm = function() {
    axios.post('/user/register', {
      name: username,
      email: email,
      password: password1,
      password2: password2,
      usernames: [twitterUsername, youtubeUsername]
    })
      .then(resVal => {
        console.log(resVal);
        if (resVal.data !== 'OK. Redirecting to /user/login') {
          setErrorMsgs(resVal.data);
        } else {
          setRedirect(true);
        }
      });
  };

  return (
    <>
      <br />
      <br />
      {redirect ? <Redirect to='/login'/> : ''}
      <Grid container direction="column" justifyContent="center">
        <Grid item spacing={2}>
          <TextField
            required
            label="Username"
            variant="outlined"
            id="username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}/>
        </Grid>
        <br />
        <Grid item spacing={2}>
          <TextField
            required
            type="email"
            label="Email"
            variant="outlined"
            id="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}/>
        </Grid>
        <br />
        <Grid item spacing={2}>
          <TextField
            type="password"
            required
            label="password"
            variant="outlined"
            id="password1"
            onChange={(event) => {
              setPassword1(event.target.value);
            }}/>
        </Grid>
        <br />
        <Grid item spacing={2}>
          <TextField
            required
            label="Re-enter Password"
            variant="outlined"
            id="password2"
            onChange={(event) => {
              setPassword2(event.target.value);
            }}/>
        </Grid>
        <br />
        <Grid item spacing={2}>
          <TextField
            required
            label="Twitter Username"
            variant="outlined"
            id="twitterUsername"
            onChange={(event) => {
              setTwitterUsername(event.target.value);
            }}/>
        </Grid>
        <br />
        <Grid item spacing={2}>
          <TextField
            type="password"
            required
            label="YouTube Username"
            variant="outlined"
            id="youtubeUsername"
            onChange={(event) => {
              setYoutubeUsername(event.target.value);
            }}/>
        </Grid>
        <br />
        <Grid item spacing={2}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => {
              submitForm();
            }}>
          Register
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

      {/* <div className='registration-container'>
        {redirect ? <Redirect to='/login'/> : ''}
        <h2 className='registration-title'>Register For Soapbox</h2>
        <div className="registration-form">
          <label>Username: </label>
          <input
            type="text"
            id="username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}></input>
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
            id="password1"
            onChange={(event) => {
              setPassword1(event.target.value);
            }}></input>
          <label>Re-enter Password: </label>
          <input
            type="password"
            id="password2"
            onChange={(event) => {
              setPassword2(event.target.value);
            }}></input>
          <label>Twitter Username: </label>
          <input
            type="text"
            id="twitterUsername"
            onChange={(event) => {
              setTwitterUsername(event.target.value);
            }}></input>
          <label>YouTube Username: </label>
          <input
            type="text"
            id="youtubeUsername"
            onChange={(event) => {
              setYoutubeUsername(event.target.value);
            }}></input>
          <button
            onClick={() => {
              submitForm();
            }}>REGISTER</button>
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