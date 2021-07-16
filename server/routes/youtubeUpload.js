const router = require('express').Router();
const credentials = require('../.credentials.json');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const open = require('open');
const youtube = require('youtube-api');
const fs = require('fs');

const oAuth = youtube.authenticate({
  "type": 'oauth', // eslint-disable-line
  "client_id": credentials.web.client_id, // eslint-disable-line
  "client_secret": credentials.web.client_secret, // eslint-disable-line
  "redirect_url": credentials.web.redirect_uris[0], // eslint-disable-line
});

const storage = multer.diskStorage({
  destination: './',
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
    const filename = req.file.filename;
    const { title, description } = req.body;

    open(oAuth.generateAuthUrl({
      "access_type": 'offline', // eslint-disable-line
      "scope": 'https://www.googleapis.com/auth/youtube.upload', // eslint-disable-line
      "state": JSON.stringify({ filename, title, description }) // eslint-disable-line
    }));
  }
});

router.get('/oauth2/callback', (req, res) => {
  res.redirect('/dashboard');
  const { filename, title, description } = JSON.parse(req.query.state);
  oAuth.getToken(req.query.code, (err, tokens) => {
    if (err) {
      console.log('Issue with /oauth2/callback getToken route', err);
      return;
    }
    oAuth.setCredentials(tokens);

    youtube.video.insert({
      resource: {
        snippet: { title, description },
        status: { privacyStatus: 'private' }
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
      console.log('Video has been updated: ', data);
    });
  });
});

module.exports = router;