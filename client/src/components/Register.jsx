import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

let errorID = 0;

export const Register = function() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [twitterUsername, setTwitterUsername] = useState('');
  const [youtubeUsername, setYoutubeUsername] = useState('');
  const [errorMsgs, setErrorMsgs] = useState([]);

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
        }
      });
  };

  return (
    <div className='registration-container'>
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
    </div>
  );

};