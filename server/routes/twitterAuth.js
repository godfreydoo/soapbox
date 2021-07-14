require('dotenv').config({ path: '../../config/.env' });
const router = require('express').Router();
const axios = require('axios');
const passport = require('passport');
// Pass ensureTwitterLogin as a second parameter in routing to authenticate
const { ensureTwitterLogin } = require('../../config/auth');
// const { ensureTwitterAuthenticated } = require('../../config/auth');


require('../../config/twitterPassport')(passport);

router.get('/', passport.authenticate('twitter'));

router.get('/error', (req, res) => res.send('Unknown Error'));

router.get('/dashboard', ensureTwitterLogin, (req, res) => {
  // console.log(req);
  // res.send(`Hello ${req.user.displayName}`);
  res.send('Welcome user');
});

router.get('/callback', passport.authenticate('twitter', { failureRedirect: '/auth/error' }),
  function (req, res) {
    // console.log(req.authInfo);
    res.cookie('twitter-auth-request', req.authInfo, { httpOnly: false });
    res.redirect('../twitter/dashboard');
  });

router.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.clearCookie('twitter-auth-request');
  res.redirect('/');
});

module.exports = router;