const express = require('express');
const router = require('./routes/routes.js');
const path = require('path');
const db = require('../db');
const port = 3000;

let app = express();

app.use(express.static(path.resolve(__dirname, "./../client/dist")));
app.use(express.json());
app.use(router);

app.use('/api', require('./routes/routes'));

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
