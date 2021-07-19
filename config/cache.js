const { redisClient } = require('../db/index');

module.exports = {
  cacheVideo: function (req, res, next) {
    redisClient.get('video', (err, data) => {
      if (err) {
        console.log(err);
        console.log('cacheVideo has an error in config/cache.js');
      }
      if (data !== null) {
        res.status(200).json(JSON.parse(data));
      } else {
        next();
      }
    });
  }
};