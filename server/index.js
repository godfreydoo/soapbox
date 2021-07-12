const express = require('express');
const path = require('path');
const db = require('../db');
const port = 3000;

const axios = require('axios');

let app = express();

app.use(express.static(path.resolve(__dirname, './../client/dist')));
app.use(express.json());

app.use('/', require('./routes/index'));
app.use('/twitter', require('./routes/twitter'));

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});