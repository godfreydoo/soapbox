const router = require('express').Router();
const axios = require('axios');

const video_ids = [];

router.get('/youtube/video', async (req, res) => {
    try {
        const videos = await axios.get('https://www.googleapis.com/youtube/v3/search?key=AIzaSyAN7199q80d7V437tldQi4qcXOaa4Tp5UY&channelId=UCYZclLEqVsyPKP9HW87tPag&part=id&order=date');
        videos.data.items.map(video => {
            video_ids.push(video.id.videoId);
        })
        console.log(video_ids)
        res.json(videos.data);
    }
    catch(err) {
        console.log(err);
    }
});

module.exports = router;