require('dotenv').config({ path: '../.env' });
const router = require('express').Router();
const axios = require('axios');

//gets video Ids by channel Id
router.get('/video', (req, res) => {
  try {
    const videos = axios.get(`https://www.googleapis.com/youtube/v3/search?key=${process.env.GOOGLE_API}&channelId=${req.query.channelId}&part=id&order=date`).then(data => {
     
      const mappedVideos = data.data.items.map( video => {
        console.log(video.id.videoId);
        return axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${video.id.videoId}&key=${process.env.GOOGLE_API}`);
      });
      Promise.all(mappedVideos)
        .then(stats => {
          const allVideoStats = [];
          stats.forEach(videoStats => { allVideoStats.push(videoStats.data.items); });
          res.json(allVideoStats);
        });
    });
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;