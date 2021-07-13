import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Login = function() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsgs, setErrorMsgs] = useState([]);

  const submitLogin = function() {
    axios.post('/user/login', {
      name: username,
      password: password
    })
      .then(resVal => {
        if (resVal.data) {
          console.log(resVal.data);
          //setErrorMsgs(resVal.data);
        }
      });
  };

  return (
    <div className='login-container'>
      <h2 className='login-title'>Login</h2>
      <div className="login-form">
        <label>Username: </label>
        <input
          type="text"
          id="username"
          onChange={(event) => {
            setUsername(event.target.value);
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