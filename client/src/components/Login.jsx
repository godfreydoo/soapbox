import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

export const Login = function({ setApplicationAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsgs, setErrorMsgs] = useState([]);
  const [redirect, setRedirect] = useState(false);

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
    <div className='login-container'>
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
    </div>
  );
};

Login.propTypes = {
  setApplicationAuth: PropTypes.func
};