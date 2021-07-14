const CronJob = require('cron').CronJob;
const { Jobs } = require('../../db/schema');
const models = require('../../db/models/jobs');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const date = require('date-and-time');

const logStream = fs.createWriteStream(path.join(__dirname, 'cron.log'));
const now = new Date();

const consoleEveryMinute = new CronJob('* * * * *', function () {
  logStream.write(`${new Date()} -- this is just a test to make sure cron job is working \n`);
}, null, true, 'America/Los_Angeles');

const executeJob = async function (document) {
  var socialMediaPlatform = document.payload;
  for (var key in socialMediaPlatform) {
    if (key === 'twitter') {
      let config = {
        method: 'post',
        url: '/twitter/tweet',
        header: {
          Authorization: `Bearer ${document.twitterToken}`
        },
        data: document.payload.twitter
      };
      try {
        let data = await axios(config);
        console.log('tweet has posted', data);
      } catch (err) {
        console.error(err);
      }
    } else {
      if (key === 'youtube') {
        let config = {
          method: 'post',
          url: '/youtube/video',
          header: {
            Authorization: `Bearer ${document.youtubeToken}`
          },
          data: document.payload.youtube
        };
        try {
          let data = await axios(config);
          console.log('video has posted', data);
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
};

const updateJob = async function () {
  try {

  } catch (err) {
    console.error(err);
  }
};

const checkJobs = new CronJob('* * * * *', async function () {
  try {
    let response = await models.getSchedule();
    if (response.length > 0) {

      const remainingJobsToRun = response.filter(document => document.completed === false && document.sendAt < new Date()).map( async (value, index) => {
        // console.log(value.sendAt < now);
        // console.log(value.sendAt);
        await executeJob(value);
      });
      const promisesToResolve = await Promise.allSettled(remainingJobsToRun);
      logStream.write(`${date.format(now, 'YYYY/MM/DD HH:mm:ss')} -- ${promisesToResolve || 0} jobs ran\n`);
    } else {
      logStream.write(`${date.format(now, 'YYYY/MM/DD HH:mm:ss')} -- no scheduled jobs\n`);
    }
  } catch (err) {
    console.error(err);
  }
}, null, true, 'America/Los_Angeles');


// every day at 10am will delete schedule jobs
const deleteJobs = new CronJob('0 10 * * *', async function () {
  try {
    let response = await Jobs.deleteMany({completed: true});
    logStream.write(`${date.format(now, 'YYYY/MM/DD HH:mm:ss')} -- deleted ${response} completed jobs`);
  } catch (err) {
    console.error(err);
  }
}, null, true, 'America/Los_Angeles');


module.exports = {
  consoleEveryMinute,
  checkJobs,
  deleteJobs
};


