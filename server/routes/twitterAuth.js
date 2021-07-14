require('dotenv').config({ path: '../../config/.env' });
const router = require('express').Router();
const axios = require('axios');
const passport = require('passport');
// Pass ensureTwitterLogin as a second parameter in routing to authenticate
const { ensureTwitterLogin } = require('../../config/auth');
const { userCache } = require('./userCache');

require('../../config/twitterPassport')(passport);

router.get('/', passport.authenticate('twitter'));

router.get('/error', (req, res) => res.send('Unknown Error'));

router.get('/dashboard', ensureTwitterLogin, (req, res) => {
  res.send(`Hello ${userCache.req.user.username}`);
});

router.get('/callback', passport.authenticate('twitter', { failureRedirect: '/auth/error' }),
  function (req, res) {
    userCache.req = req;
    res.cookie('twitter-auth-request', req.authInfo);
    res.redirect('../twitter/dashboard');
  });

router.get('/logout', (req, res) => {
  userCache.req = '';
  req.session = null;
  req.logout();
  res.clearCookie('twitter-auth-request');
  res.redirect('/');
});

module.exports = router;