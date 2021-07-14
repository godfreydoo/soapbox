require('dotenv').config({ path: '../../config/.env' });
const router = require('express').Router();
const axios = require('axios');
const passport = require('passport');
require('../../config/youtubePassport')(passport);
// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get('/',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login,\
                                             https://www.googleapis.com/auth/youtube,\
                                             https://www.googleapis.com/auth/youtube.force-ssl,\
                                             https://www.googleapis.com/auth/youtube.upload,\
                                             https://www.googleapis.com/auth/youtube.readonly'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/youtube/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;