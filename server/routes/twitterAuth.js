require('dotenv').config({ path: '../../config/.env' });
const router = require('express').Router();
const axios = require('axios');
const passport = require('passport');
// Pass ensureTwitterLogin as a second parameter in routing to authenticate
const { ensureTwitterLogin } = require('../../config/auth');
const { reqCache } = require('./reqq.js');

require('../../config/twitterPassport')(passport);

router.get('/', passport.authenticate('twitter'));

router.get('/error', (req, res) => res.send('Unknown Error'));

router.get('/dashboard', ensureTwitterLogin, (req, res) => {
  res.send(`Hello ${reqCache.username}, Twitter Id: ${reqCache.id}`);
});

router.get('/callback', passport.authenticate('twitter', { failureRedirect: '/auth/error' }),
  function (req, res) {
    reqCache.username = req.user.username;
    reqCache.id = req.user.id;
    res.cookie('twitter-auth-request', req.authInfo);
    res.cookie('username', req.user.username);
    res.cookie('id', req.user.id);
    res.redirect('../twitter/dashboard');
  });

router.get('/logout', (req, res) => {
  reqCache.username = '';
  reqCache.id = '';
  req.session = null;
  req.logout();
  res.clearCookie('twitter-auth-request');
  res.clearCookie('username');
  res.clearCookie('id');
  res.redirect('/');
});

module.exports = router;