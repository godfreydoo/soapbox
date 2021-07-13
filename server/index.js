require('dotenv').config({ path: '../.env' });
const express = require('express');
const path = require('path');
const db = require('../db');
const passport = require('passport');
const cookieSession = require('cookie-session');
const port = 3000;

let app = express();

// require('../config/passport')(passport);

app.use(cookieSession({
  name: 'twitter-auth-session',
  keys: ['key1', 'key2']
}));

app.use(express.static(path.resolve(__dirname, './../client/dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/index'));
app.use('/twitter', require('./routes/twitter'));
app.use('/auth/twitter', require('./routes/twitterAuth'));
// app.use('/youtube', require('./routes/youtube'));
app.use('/youtube', require('./routes/youtube'));
app.use('/user', require('./routes/user'));

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

// used for testing and portability
module.exports = app;
