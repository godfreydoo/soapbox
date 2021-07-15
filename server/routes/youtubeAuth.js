require('dotenv').config({ path: '../../config/.env' });
const router = require('express').Router();
const axios = require('axios');
const fs = require('fs');
const passport = require('passport');
const { google } = require('googleapis'); 
const { youtube} = google.youtube('v3');
const { ensureGoogleAuthenticated } = require('../../config/auth');
require('../../config/googlePassport')(passport);

var authClient = new google.auth.JWT(
  'Service account client email address',
  'youtube.pem',
  null,
  ['https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/youtube.upload'],
  null
);

authClient.authorize(function(err, tokens) {
  if (err) {
    console.log(err);
    return;
  }
  youtube.videos.insert({auth: authClient, part: 'snippet,status,contentDetails'}, function(err, resp) {
    console.log(resp);
    console.log(err);
  });
});


const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_URI
);
google.options({
  auth: oauth2Client
});

router.get('/',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/youtube.upload'] }));


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
  Auth.getToken((err, token) => {
    if (err) {
      console.log(err, 400);
      return Logger.log(err);
    }
    Auth.setCredentials(token);
    try {
      // console.log(req.params);

      const report = axios.get('https://youtubeanalytics.googleapis.com/v2/reports');
      res.cookie('google-auth-request', req.authInfo);
      res.send(report.data);
    } catch (err) {
      console.log(err);
    }
  });
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

router.post('/upload', (req, res) => {
  const videoUpload = axiox.post('https://www.googleapis.com/upload/youtube/v3/videos');
});
module.exports = router;