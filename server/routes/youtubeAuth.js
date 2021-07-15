/* eslint-disable camelcase */
require('dotenv').config({ path: '../../config/.env' });
const router = require('express').Router();
const axios = require('axios');
const fs = require('fs');
const passport = require('passport');
const { OAuth2Strategy } = require('passport-google-oauth');
const Youtube = require('youtube-api');
const { ensureGoogleAuthenticated } = require('../../config/auth');
require('../../config/googlePassport')(passport);

let Auth = Youtube.authenticate({
  type: 'oauth',
  client_id: process.env.GOOGLE_CLIENT_ID,
  client_secret: process.env.GOOGLE_CLIENT_SECRET,
  redirect_url: process.env.GOOGLE_URI
});


router.get('/',
  passport.authenticate('google', { scope: ['profile', 'https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/youtube.upload', 'https://www.googleapis.com/auth/youtube.readonly', 'https://www.googleapis.com/auth/yt-analytics.readonly'] }));


router.get('/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.cookie('google-auth-request', req.authInfo);
    res.redirect('/');
  });

router.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.clearCookie('google-auth-request');
  res.redirect('/');
});

router.get('/ytreports', ensureGoogleAuthenticated, (req, res) => {
  
  try {
    console.log(req.params);
    
    const report = axios.get('https://youtubeanalytics.googleapis.com/v2/reports');
    res.cookie('google-auth-request', req.authInfo);
    res.send(report.data);
  } catch (err) {
    console.log(err);
  }
  
});

router.post('/upload', (req, res) => {
  console.log('INSIDE UPLOAD');
  const videoUpload = axiox.post('https://www.googleapis.com/upload/youtube/v3/videos/insert');
  //data that will be needed for upload
//   {
//     "snippet": {
//       "title": "",
//       "description": "",
//       "publishedAt": ""
//     },
//     "status": {
//       "embeddable": false,
//       "uploadStatus": "uploaded",
//       "license": "youtube"
//     },
//     "player": {
//       "embedHeight": 0
//     }
//   }
});

router.get('/test', ensureGoogleAuthenticated, (req, res) => {
  res.send('Hello Tester');
});

module.exports = router;