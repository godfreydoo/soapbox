const router = require('express').Router();
const axios = require('axios');
const path = require('path');
// Pass ensureAuthenticated as a second parameter in routing to authenticate
const { ensureAuthenticated } = require('../../config/auth');

router.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = router;