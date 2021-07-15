const CronJob = require('cron').CronJob;
const { Jobs } = require('../../db/schema');
const models = require('../../db/models/jobs');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const date = require('date-and-time');

const logStream = fs.createWriteStream(path.join(__dirname, 'cron.log'));

// const consoleEveryMinute = new CronJob('* * * * *', function () {
//   logStream.write(`${new Date()} -- this is just a test to make sure cron job is working \n`);
// }, null, true, 'America/Los_Angeles');

const executeTwitterJob = async function (document) {
  let config = {
    method: 'post',
    url: 'http://localhost:3000/twitter/tweet',
    header: {
      'authorization': `Bearer ${document.twitterToken}`
    },
    data: { status: document.twitterPayload}
  };
  try {
    let data = await axios(config);
  } catch (err) {
    console.error(err);
  }
};

const updateJob = async function () {
  try {
    let response = await Jobs.updateMany({ completed: false, sendAt: {$lte: new Date() } }, { $set: { completed: true } });
    return response;
  } catch (err) {
    console.error(err);
  }
};

const checkJobs = new CronJob('* * * * *', async function () {
  try {
    let response = await Jobs.find({ completed: false, sendAt: {$lte: new Date() } });
    if (response.length > 0) {
      const remainingJobsToRun = response.map( async (value, index) => {
        await executeTwitterJob(value);
      });
      const promisesToResolve = await Promise.allSettled(remainingJobsToRun);
      const jobsUpdated = updateJob();
      logStream.write(`${date.format(new Date(), 'YYYY/MM/DD HH:mm:ss')} -- jobs ran and updated\n`);
    } else {
      logStream.write(`${date.format(new Date(), 'YYYY/MM/DD HH:mm:ss')} -- no scheduled jobs\n`);
    }
  } catch (err) {
    console.error(err);
  }
}, null, true, 'America/Los_Angeles');


// every day at 10am will delete schedule jobs
const deleteJobs = new CronJob('0 10 * * *', async function () {
  try {
    let response = await Jobs.deleteMany({completed: true});
    logStream.write(`${date.format(new Date(), 'YYYY/MM/DD HH:mm:ss')} -- deleted ${response} completed jobs`);
  } catch (err) {
    console.error(err);
  }
}, null, true, 'America/Los_Angeles');


module.exports = {
  checkJobs,
  deleteJobs
};