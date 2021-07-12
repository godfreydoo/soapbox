const router = require('express').Router();
const axios = require('axios');
const path = require('path');
// Pass ensureAuthenticated as a second parameter in routing to authenticate
const { ensureAuthenticated } = require('../../config/auth');

router.get('/*', ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500);
    }
  });
});

module.exports = router;