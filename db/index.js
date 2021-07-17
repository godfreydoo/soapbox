require('dotenv').config({ path: '../.env'});
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true});

const mongoDB = mongoose.connection;

mongoDB.on('error', () => {
  console.log('\x1b[41m', 'mongoose connection error');
});

mongoDB.once('open', () => {
  console.log('mongoose connected successfully');
});

const redis = require('redis');
const redisPort = 6379;
const redisClient = redis.createClient(redisPort);

if (process.env.NODE_ENV !== 'test') {
  redisClient.on('error', function(error) {
    if (error) {
      console.log('Redis client is not connected ', error);
    }
  });
  console.log('Redis client connected ');
}



module.exports = {
  mongoDB,
  redisClient
};