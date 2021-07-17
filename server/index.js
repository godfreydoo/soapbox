require('dotenv').config({ path: '../.env' });
const express = require('express');
const path = require('path');
const mongoDB = require('../db');
const passport = require('passport');
const cookieSession = require('cookie-session');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const port = 3000;
const axios = require('axios');
const cors = require('cors');

let app = express();

app.use(cors());
app.use(cookieSession({
  name: 'twitter-auth-session',
  keys: ['key1', 'key2']
}));

app.use(express.static(path.resolve(__dirname, './../client/dist')));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*
1.) Session --> 2.) Passport --> 3.) Flash
Order is important
*/
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global varibales to distinguish between success and error flash messages
app.use((req, res, next) => {
  res.locals.successMsg = req.flash('successMsg');
  res.locals.errorMsg = req.flash('errorMsg');
  next();
});

// Routes
app.use('/twitter', require('./routes/twitter'));
app.use('/auth/twitter', require('./routes/twitterAuth'));
app.use('/auth/google', require('./routes/youtubeAuth'));
app.use('/youtube', require('./routes/youtube'));
app.use('/api/youtube', require('./routes/youtubeUpload'));
app.use('/user', require('./routes/user'));
app.use('/jobs', require('./routes/jobs'));
app.use('/*', require('./routes/index'));


if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    const { checkJobs, deleteJobs} = require('./cron/jobs.js');
    console.log(`Listening on port ${port}`);
  });
}

// used for testing and portability
module.exports = app;


