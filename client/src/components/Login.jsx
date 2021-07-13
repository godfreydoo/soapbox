import React from 'react';
import { Link } from 'react-router-dom';

export const Login = function() {
  return (
    <div className='login-container'>
      <h2 className='login-title'>Login</h2>
      <div className="login-form">
        <label>Username: </label>
        <input type="text" id="username" onChange={() => {}}></input>
        <label>Password: </label>
        <input type="password" id="password" onChange={() => {}}></input>
        <button onClick={() => {}}>Login</button>
      </div>
    </div>
  );
};