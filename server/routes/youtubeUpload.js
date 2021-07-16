require('dotenv').config({ path: '../../config/.env' });
const router = require('express').Router();
// const credentials = require('../.credentials.json');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const open = require('open');
const youtube = require('youtube-api');
const fs = require('fs');

const oAuth = youtube.authenticate({
  "type": 'oauth', // eslint-disable-line
  "client_id": process.env.YOUTUBE_UPLOAD_CLIENT_ID, // eslint-disable-line
  "client_secret": process.env.YOUTUBE_UPLOAD_CLIENT_SECRET, // eslint-disable-line
  "redirect_url": process.env.YOUTUBE_UPLOAD_REDIRECT_URI, // eslint-disable-line
});

const storage = multer.diskStorage({
  destination: './videos',
  filename(req, file, cb) {
    const newFileName = `${uuidv4()}-${file.originalname}`;

    cb(null, newFileName);
  }
});

const uploadVideoFile = multer({
  storage: storage
}).single('videoFile');

router.post('/upload', uploadVideoFile, (req, res) => {
  if (req.file) {
    const filename = `./videos/${req.file.filename}`;
    const { title, description, sendAt } = req.body;

    open(oAuth.generateAuthUrl({
      "access_type": 'offline', // eslint-disable-line
      "scope": 'https://www.googleapis.com/auth/youtube.upload', // eslint-disable-line
      "state": JSON.stringify({ filename, title, description, sendAt }) // eslint-disable-line
    }));
  }
});

router.get('/oauth2/callback', (req, res) => {
  res.redirect('/dashboard');
  const { filename, title, description, sendAt } = JSON.parse(req.query.state);
  debugger;
  oAuth.getToken(req.query.code, (err, tokens) => {
    if (err) {
      console.log('Issue with /oauth2/callback getToken route', err);
      return;
    }
    oAuth.setCredentials(tokens);

    youtube.videos.insert({
      resource: {
        snippet: { title, description },
        status: { privacyStatus: 'private', publishAt: sendAt }
      },
      part: 'snippet,status',
      media: {
        body: fs.createReadStream(filename)
      }
    }, (err, data) => {
      if (err) {
        console.log('Issue with /oauth2/callback video insert route', err);
        return;
      }
      console.log('Video has been uploaded and will appear shortly');
    });
  });
});

module.exports = router;