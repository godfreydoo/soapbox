require('dotenv').config({ path: '../../config/.env' });
const router = require('express').Router();
const axios = require('axios');
const fs = require('fs');
const passport = require('passport');
const { google } = require('googleapis'); 
const { youtube } = google.youtube('v3');
const { ensureGoogleAuthenticated } = require('../../config/auth');
require('../../config/googlePassport')(passport);




const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/dashboard'
);
google.options({
  auth: oauth2Client
});

const scopes = [
  'https://www.googleapis.com/auth/plus.login',
  'https://www.googleapis.com/auth/youtube.upload'
];

router.get('/',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/youtube.upload'] }));


router.get('/callback',
  passport.authenticate('google', { failureRedirect: '/login', scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/youtube.upload', 'https://www.googleapis.com/auth/yt-analytics.readonly', 'https://www.googleapis.com/auth/yt-analytics-monetary.readonly', 'https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/youtubepartner' ] }),
  function(req, res) {
    res.cookie('google-auth-request', req.authInfo);
    res.redirect('/auth/google/ytreports');
  });

router.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.clearCookie('google-auth-request');
  res.redirect('/');
});

router.get('/ytreports', ensureGoogleAuthenticated, async (req, res) => {
  console.log('REQCOOKIES', process.env.GOOGLE_BEARER);
  // debugger;
  const ytAnalyticsEndPoint = 'https://youtubeanalytics.googleapis.com/v2/reports?endDate=2021-05-01&ids=channel%3D%3DMINE&metrics=views%2Ccomments%2Clikes%2Cdislikes%2CestimatedMinutesWatched%2CaverageViewDuration&startDate=2017-01-01';
  const bearerToken = `Bearer ${req.cookies['google-auth-request']}`;
  var config = {
    method: 'GET',
    url: ytAnalyticsEndPoint,
    headers: { 
      Authorization: `Bearer ${process.env.GOOGLE_BEARER}`
    }
  };
  
  try {
    

    const report = await axios(config);
    debugger;
    // res.cookie('google-auth-request', req.authInfo);
    res.json(report.data);
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
  google.auth;
  res.send('Hello Tester');
});

router.post('/upload', (req, res) => {
  const videoUpload = axiox.post('https://www.googleapis.com/upload/youtube/v3/videos');
});
module.exports = router;