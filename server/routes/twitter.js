require('dotenv').config({ path: '../.env' });
const router = require('express').Router();
const axios = require('axios');
const Twitter = require('twitter');
const { ensureTwitterAuthenticated } = require('../../config/auth');

router.post('/hashtag-data', async (req, res) => {
  const twitterEndPoint = `https://api.twitter.com/2/users/${req.body.userId}/tweets?tweet.fields=created_at,entities,public_metrics&max_results=${req.body.maxResults}`;
  const bearerToken = `Bearer ${process.env.BEARER_TOKEN}`;

  const options = {
    method: 'GET',
    url: twitterEndPoint,
    headers: {
      Authorization: bearerToken
    }
  };

  try {
    const results = await axios(options);

    res.status(200).end(JSON.stringify(analyzeHashtags(results.data.data)));
  } catch (err) {
    res.status(404).end('There was an error fetching Twitter data:', err);
  }
  res.end();
});

// curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjEzNzU5OTQ0OTc1MzY5MDkzMTItNGllRmhtM0Z1eVVJRUlUVVQySVdDZkkzbk81ckNKIiwidG9rZW5TZWNyZXQiOiJqaVE3UDFmVm9JanNDOW9tdkxaT0s0aEFBUUZCTzlXcVNFU1B3VVptVEx1ZjEiLCJ0d2l0dGVyIjoiZ29kZnJleTU2ODE0MzA2IiwiaWF0IjoxNjI2MTgxNTUwfQ.govuo4iHionF6-oVsaAxA5zRZ0kXNahK5vtMEMJ8FYE" http://localhost:3000/twitter/home-timeline | json_pp

router.get('/home-timeline', ensureTwitterAuthenticated, async (req, res) => {
  const client = new Twitter({
    "consumer_key": process.env.CONSUMER_KEY, // eslint-disable-line
    "consumer_secret": process.env.CONSUMER_SECRET, // eslint-disable-line
    "access_token_key": req.token, // eslint-disable-line
    "access_token_secret": req.tokenSecret // eslint-disable-line
  });

  client.get('statuses/home_timeline', function (err, tweets, response) {
    if (err) {
      throw err;
    }
    res.status(200).json(tweets);
  });
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