require('dotenv').config({ path: '../.env' });
const router = require('express').Router();
const axios = require('axios');
const Twitter = require('twitter');
const Twitter2 = require('twitter-v2');
const date = require('date-and-time');
const { redisClient } = require('../../db/index');
const { ensureTwitterAuthenticated } = require('../../config/auth');

router.post('/hashtag-data', async (req, res) => {
  const twitterEndPoint = `https://api.twitter.com/2/users/${req.body.userId}/tweets?tweet.fields=created_at,entities,public_metrics&max_results=${req.body.maxResults}`;
  const bearerToken = `Bearer ${process.env.TWITTER_BEARER_TOKEN}`;
  //console.log("THIS IS IN THE HASHTAG ROUTE");

  const options = {
    method: 'GET',
    url: twitterEndPoint,
    headers: {
      Authorization: bearerToken
    }
  };

  try {
    const results = await axios(options);
    var aggregateData = { hashtagData: analyzeMetrics('hashtags', results.data.data), urlData: analyzeMetrics('urls', results.data.data) };

    res.status(200).json(aggregateData);
  } catch (err) {
    res.status(404).end('There was an error fetching Twitter data:', err);
  }
  res.end();
});

router.get('/home-timeline', ensureTwitterAuthenticated, async (req, res) => {
  const client = new Twitter({
    "consumer_key": process.env.TWITTER_CONSUMER_KEY, // eslint-disable-line
    "consumer_secret": process.env.TWITTER_CONSUMER_SECRET, // eslint-disable-line
    "access_token_key": req.token, // eslint-disable-line
    "access_token_secret": req.tokenSecret // eslint-disable-line
  });
  /*
  Retrieve twitter home timeline
  Without cache: 1.8s
  With cache: 850 ms
  Cache duration: 60 seconds
  */
  redisClient.get('tweets', (err, data) => {
    if (err) {
      throw err;
    } else {
      if (!data) {
        client.get('statuses/home_timeline', function (err, tweets, response) {
          if (err) {
            throw err;
          }
          // implement a 60 second cache
          redisClient.setex('tweets', 60, JSON.stringify(tweets));
          res.status(200).json(tweets);
        });
      } else {
        res.status(200).json(JSON.parse(data));
      }
    }
  });
});

router.post('/user', ensureTwitterAuthenticated, async (req, res) => {

  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY, // eslint-disable-line
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET, // eslint-disable-line
    access_token_key: req.token, // eslint-disable-line
    access_token_secret: req.tokenSecret, // eslint-disable-line
  });

  client.get('users/show', { id: `${req.body.userId}` }, function (err, user, response) {
    if (err) {
      throw err;
    }
    res.status(200).json(user);
  });
});

router.post('/metrics', ensureTwitterAuthenticated, async (req, res) => {
  const client = new Twitter2({
    consumer_key: process.env.TWITTER_CONSUMER_KEY, // eslint-disable-line
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET, // eslint-disable-line
    access_token_key: req.token, // eslint-disable-line
    access_token_secret: req.tokenSecret, // eslint-disable-line
  });

  try {
    const tweets = await client.get(`users/${req.body.userId}/tweets?tweet.fields=created_at,entities,public_metrics,non_public_metrics&max_results=${req.body.maxResults}`);

    res.status(200).end(JSON.stringify(tweets.data.data));

  } catch (err) {

    res.status(404).end('There was an error fetching Twitter data:', err);
  }

  res.end();
});

router.post('/tweet', ensureTwitterAuthenticated, async (req, res) => {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY, // eslint-disable-line
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET, // eslint-disable-line
    access_token_key: req.token, // eslint-disable-line
    access_token_secret: req.tokenSecret, // eslint-disable-line
  });

  client.post('statuses/update', { status: `${req.body.status}` }, function (error, tweet, response) {
    if (error) { throw error; }
    console.log(`Tweet has been created at ${tweet.created_at}. Tweet id ${tweet.id} and desc: ${tweet.text}`);
  });

  res.end();
});

var analyzeMetrics = function (entityType, data) {

  var analytics = {};

  var identifier = entityType === 'urls' ? 'display_url' : 'tag';

  if (!data) {
    return 'You have no tweets posted';
  }

  for (var i = 0; i < data.length; i++) {
    var entityArr = data[i].entities ? data[i].entities[entityType] || [] : [];
    for (var j = 0; j < entityArr.length; j++) {
      var entity = entityType === 'urls' ? entityArr[j][identifier].slice(0, entityArr[j][identifier].indexOf('com') + 3) : entityArr[j][identifier];
      if (analytics[entity]) {
        analytics[entity].retweets += data[i].public_metrics.retweet_count;
        analytics[entity].replies += data[i].public_metrics.reply_count;
        analytics[entity].likes += data[i].public_metrics.like_count;
        analytics[entity].totalTweets++;
        analytics[entity].retweetAvg = analytics[entity].retweets / analytics[entity].totalTweets;
        analytics[entity].replyAvg = analytics[entity].replies / analytics[entity].totalTweets;
        analytics[entity].likesAvg = analytics[entity].likes / analytics[entity].totalTweets;
      } else {
        analytics[entity] = {};
        analytics[entity].retweets = data[i].public_metrics.retweet_count;
        analytics[entity].replies = data[i].public_metrics.reply_count;
        analytics[entity].likes = data[i].public_metrics.like_count;
        analytics[entity].totalTweets = 1;
        analytics[entity].retweetAvg = analytics[entity].retweets;
        analytics[entity].replyAvg = analytics[entity].replies;
        analytics[entity].likesAvg = analytics[entity].likes;
      }
    }
  }

  return analytics;
};

module.exports = router;