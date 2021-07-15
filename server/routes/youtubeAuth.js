require('dotenv').config({ path: '../../config/.env' });
const router = require('express').Router();
const axios = require('axios');
const fs = require('fs');
const passport = require('passport');
const { ensureGoogleAuthenticated } = require('../../config/auth');
require('../../config/googlePassport')(passport);

router.get('/',
  passport.authenticate('google', { scope: ["https://www.googleapis.com/auth/plus.login", "https://www.googleapis.com/auth/youtube.upload"] }));


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

router.post('/upload', (req, res) => {
    const videoUpload = axiox.post(`https://www.googleapis.com/upload/youtube/v3/videos`);
});
module.exports = router;