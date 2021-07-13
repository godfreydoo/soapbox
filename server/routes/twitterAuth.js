require('dotenv').config({ path: '../../config/.env' });
const router = require('express').Router();
const axios = require('axios');
const passport = require('passport');
// Pass ensureTwitterLogin as a second parameter in routing to authenticate
const { ensureTwitterLogin } = require('../../config/auth');

require('../../config/twitterPassport')(passport);

router.get('/', passport.authenticate('twitter'));

router.get('/error', (req, res) => res.send('Unknown Error'));

router.get('/dashboard', ensureTwitterLogin, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

router.get('/callback', passport.authenticate('twitter', { failureRedirect: '/auth/error' }),
  function (req, res) {
    res.redirect('../twitter/dashboard');
  });

router.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
});

module.exports = router;