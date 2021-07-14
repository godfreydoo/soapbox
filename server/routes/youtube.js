require('dotenv').config({ path: '../.env' });
const router = require('express').Router();
const axios = require('axios');

router.get('/channel-stats', async (req, res) => {
  try {
    console.log(req.body, req.query, req.params);
    const channelInfo = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&id=${req.query.id}&key=${process.env.GOOGLE_API}`);
    console.log(channelInfo.data.items);
    res.json(channelInfo.data);

  } catch (err) {
    console.log(err);
  }
});

//gets video Ids by channel Id
router.get('/video', (req, res) => {
  try {
<<<<<<< HEAD
    console.log(req.body);
    const videos = axios.get(`https://www.googleapis.com/youtube/v3/search?key=${process.env.GOOGLE_API}&channelId=${req.body.channelId}&part=id&order=date`).then(data => {
=======
    console.log(req.body, req.query, req.params);

    const videos = axios.get(`https://www.googleapis.com/youtube/v3/search?key=${process.env.GOOGLE_API}&channelId=${req.query.channelId}&part=id&order=date`).then(data => {
>>>>>>> dbe6044ebf6afad0b9a8186fb2b009ca0a5ecee5

      const mappedVideos = data.data.items.map( video => {
        console.log(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${video.id.videoId}&key=${process.env.GOOGLE_API}`)
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


module.exports = router;