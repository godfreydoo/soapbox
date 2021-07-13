require('dotenv').config({ path: '../.env' });
const router = require('express').Router();
const axios = require('axios');
// Pass ensureAuthenticated as a second parameter in routing to authenticate
const { ensureAuthenticated } = require('../../config/auth');

router.get('/hashtag-data', async (req, res) => {
  const options = {
    method: 'GET',
    url: `https://api.twitter.com/2/users/20702956/tweets?tweet.fields=created_at,entities,public_metrics&max_results=20`,
    headers: {
      "Authorization": `Bearer ${process.env.BEARER_TOKEN}`
    }
  };

  try {
    const results = await axios(options);

    res.status(200).end(JSON.stringify(analyzeHashtags(results.data.data)));
  } catch (err) {
    res.status(404).end('There was an error fetching Twitter data:', err);
  }
});

var analyzeHashtags = function (data) {
  var analytics = {};

  for (var i = 0; i < data.length; i++) {
    var hashtags = data[i].entities ? data[i].entities.hashtags || [] : [];
    for (var j = 0; j < hashtags.length; j++) {
      var hashtag = hashtags[j].tag;
      if (analytics[hashtag]) {
        analytics[hashtag].retweets += data[i].public_metrics.retweet_count;
        analytics[hashtag].replies += data[i].public_metrics.reply_count;
        analytics[hashtag].likes += data[i].public_metrics.like_count;
      } else {
        analytics[hashtag] = {};
        analytics[hashtag].retweets = data[i].public_metrics.retweet_count;
        analytics[hashtag].replies = data[i].public_metrics.reply_count;
        analytics[hashtag].likes = data[i].public_metrics.like_count;
      }
    }
  }

  return analytics;
};

module.exports = router;