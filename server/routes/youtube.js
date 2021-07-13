require('dotenv').config({ path: '../.env' });
const router = require('express').Router();
const axios = require('axios');

const videoIds = [];

//gets video Ids by channel Id
router.get('/video', (req, res) => {
//   console.log(req.body, req.params, req.query);
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
          console.log(allVideoStats);
          res.json(allVideoStats);
        });
    });
  } catch (err) {
    console.log(err);
  }
});

// router.get('/video-stats', async (req, res) => {
//   try {
//     videoIds.map( (videoId) => {

//         await videoStats = axios.get(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${process.env.GOOGLE_API}`);
//     });
//     res.json(videoStats.data);
//   } catch (err) {
//     console.log(err);
//   }
// });
// { console.log(stats[0].data.items); res.json(stats[0].data.items);

module.exports = router;