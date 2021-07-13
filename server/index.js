require('dotenv').config({ path: '../.env'});
const express = require('express');
const path = require('path');
const db = require('../db');
const passport = require('passport');
const port = 3000;

const axios = require('axios');

let app = express();

require('../config/passport')(passport);

app.use(express.static(path.resolve(__dirname, './../client/dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());


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
