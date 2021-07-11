require('dotenv').config({ path: '../config/.env'});
const express = require('express');
const path = require('path');
const db = require('../db');
const passport = require('passport');
const port = 3000;

let app = express();

require('../config/passport')(passport);

app.use(express.static(path.resolve(__dirname, "./../client/dist")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
