require('dotenv').config({ path: '../.env'});
const express = require('express');
const path = require('path');
const db = require('../db');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const port = 3000;

let app = express();

require('../config/passport')(passport);

app.use(express.static(path.resolve(__dirname, './../client/dist')));
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
app.use('/', require('./routes/index'));
app.use('/twitter', require('./routes/twitter'));
app.use('/youtube', require('./routes/youtube'));
app.use('/user', require('./routes/user'));

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

// used for testing and portability
module.exports = app;
