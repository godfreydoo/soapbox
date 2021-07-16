var transformTwitterData = (data, metric) => {
  var transformedHashtagData = [];

  for (var key in data.hashtagData) {
    var metrics = data.hashtagData[key];
    var record = {};
    record['hashtag'] = `#${key}`;
    record['retweets'] = metrics.retweets;
    record['replies'] = metrics.replies;
    record['likes'] = metrics.likes;
    record['totalTweets'] = metrics.totalTweets,
    record['retweetAvg'] = metrics.retweetAvg.toFixed(1),
    record['replyAvg'] = metrics.replyAvg.toFixed(1),
    record['likesAvg'] = metrics.likesAvg.toFixed(1);

    transformedHashtagData.push(record);
  }

  var transformedUrlData = [];

  for (var key in data.urlData) {
    var metrics = data.urlData[key];
    var url = key.slice(0, key.indexOf('com') + 3);
    var record = {};
    record['url'] = `${url}`;
    record['retweets'] = metrics.retweets;
    record['replies'] = metrics.replies;
    record['likes'] = metrics.likes;
    record['totalTweets'] = metrics.totalTweets,
    record['retweetAvg'] = metrics.retweetAvg.toFixed(1),
    record['replyAvg'] = metrics.replyAvg.toFixed(1),
    record['likesAvg'] = metrics.likesAvg.toFixed(1);

    transformedUrlData.push(record);
  }

  console.log(transformedHashtagData);
  return [transformedHashtagData, transformedUrlData];
};

export default transformTwitterData;