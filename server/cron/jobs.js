const CronJob = require('cron').CronJob;
const { TwitterJobs, YouTubeJobs } = require('../../db/schema');
const models = require('../../db/models/jobs');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const date = require('date-and-time');

const logStream = fs.createWriteStream(path.join(__dirname, 'cron.log'));

// const consoleEveryMinute = new CronJob('* * * * *', function () {
//   logStream.write(`${new Date()} -- this is just a test to make sure cron job is working \n`);
// }, null, true, 'America/Los_Angeles');

const executeYouTubeJob = async function (document) {
  let config = {
    method: 'post',
    url: 'http://localhost:3000/api/youtube/upload',
    data: document.payload
  };
  try {
    await axios(config);
  } catch (err) {
    logStream.write(`${date.format(new Date(), 'YYYY/MM/DD HH:mm:ss')} -- cron executeYouTubeJob has an error for ${document._id}\n`);
  }
};

const executeTwitterJob = async function (document) {
  let config = {
    method: 'post',
    url: 'http://localhost:3000/twitter/tweet',
    headers: {
      Authorization: `Bearer ${document.token}`
    },
    data: { status: document.payload }
  };
  try {
    await axios(config);
  } catch (err) {
    logStream.write(`${date.format(new Date(), 'YYYY/MM/DD HH:mm:ss')} -- cron executeTwitterJob has an error for ${document._id}\n`);
  }
};

const checkJobs = new CronJob('* * * * *', async function () {
  try {
    let twitterResponse = await TwitterJobs.find({ completed: false, sendAt: {$lte: new Date() } });
    let youtubeResponse = await YouTubeJobs.find({ completed: false, sendAt: {$lte: new Date() } });
    if (twitterResponse.length > 0 && youtubeResponse.length > 0) {
      const remainingTwitterJobsToRun = twitterResponse.map( async (value, index) => {
        await executeTwitterJob(value);
      });
      const remainingYouTubeJobsToRun = youtubeResponse.map( async (value, index) => {
        await executeYouTubeJob(value);
      });
      const promisesToResolve = await Promise.allSettled(remainingTwitterJobsToRun, remainingYouTubeJobsToRun);
      let twitterRes = await TwitterJobs.updateMany({ completed: false, sendAt: {$lte: new Date() } }, { $set: { completed: true } });
      let youtubeRes = await YouTubeJobs.updateMany({ completed: false, sendAt: {$lte: new Date() } }, { $set: { completed: true } });
      let total = twitterRes.nModified + youtubeRes.nModified;
      logStream.write(`${date.format(new Date(), 'YYYY/MM/DD HH:mm:ss')} -- ${twitterResponse.length + youtubeResponse.length} Twitter job(s) ran and ${total} job(s) updated\n`);
    }
  } catch (err) {
    console.error('cron checkJobs has an error');
  }
}, null, true, 'America/Los_Angeles');


// every 30 minutes will delete completed jobs
const deleteJobs = new CronJob('*/30 * * * *', async function () {
  try {
    let res = await TwitterJobs.deleteMany({completed: true});
    logStream.write(`${date.format(new Date(), 'YYYY/MM/DD HH:mm:ss')} -- deleted ${res.deletedCount} completed jobs\n`);
  } catch (err) {
    console.error('cron deleteJobs has an error');
  }
}, null, true, 'America/Los_Angeles');


module.exports = {
  checkJobs,
  deleteJobs
};