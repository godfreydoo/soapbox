import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import clipart from './assets/Daco_6019216.png';

let errorID = 0;

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
    <div className='register-full'>
      <br />
      <br />
      {redirect ? <Redirect to='/login'/> : ''}
      <Grid className ="register-container" container direction="row" justifyContent="center">
        <Grid className="register-form-container" container direction="column" justifyContent="center">
          <Grid item spacing={3} justifyContent="center">
            <h4 className="register-form-title">Registration</h4>
          </Grid>
          <Grid item spacing={2}>
            <TextField
              className="register-username-field"
              required
              id="username"
              label="Username"
              placeholder=""
              variant="outlined"
              onChange={(event) => {
                setUsername(event.target.value);
              }}/>
          </Grid>
          <br />
          <Grid item spacing={2}>
            <TextField
              className="register-email-field"
              required
              id="email"
              label="Email"
              placeholder=""
              variant="outlined"
              onChange={(event) => {
                setEmail(event.target.value);
              }}/>
          </Grid>
          <br />
          <Grid item spacing={2}>
            <TextField
              className="register-password-field"
              type="password"
              required
              id="password1"
              label="Password"
              variant="outlined"
              onChange={(event) => {
                setPassword1(event.target.value);
              }}/>
          </Grid>
          <br />
          <Grid item spacing={2}>
            <TextField
              className="register-password-field"
              type="password"
              required
              id="password2"
              label="Re-type Password"
              variant="outlined"
              onChange={(event) => {
                setPassword2(event.target.value);
              }}/>
          </Grid>
          <br />
          <Grid item spacing={2} justifyContent="center">
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={submitForm}>
              Register
            </Button>
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
        <Grid className='register-clipart-container'item spacing={3} justifyContent="center">
          <img src="https://m.economictimes.com/thumb/msid-69417800,width-1200,height-900,resizemode-4,imgsize-205855/ai-in-social-media.jpg" className="register-clipart" alt="Soapbox clipart bird megaphone"/>
        </Grid>
      </Grid>
    </div>
  );
};