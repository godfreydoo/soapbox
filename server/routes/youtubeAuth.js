require('dotenv').config({ path: '../../config/.env' });
const router = require('express').Router();
const axios = require('axios');
const passport = require('passport');
const { ensureYoutubeAuthenticated } = require('../../config/auth');
require('../../config/googlePassport')(passport);

router.get('/',
  passport.authenticate('google', { scope: ["https://www.googleapis.com/auth/plus.login", "https://www.googleapis.com/auth/youtube.upload"] }));


router.get('/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.cookie('google-auth-request', req.authInfo);
    res.redirect('../google/test');
  });

router.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.clearCookie('google-auth-request');
  res.redirect('/');
});

router.get('/test', ensureYoutubeAuthenticated, (req, res) => {
  res.send('Hello Tester');
});
module.exports = router;