const CronJob = require('cron').CronJob;
const { TwitterJobs } = require('../../db/schema');
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
    headers: {
      Authorization: `Bearer ${document.token}`
    },
    data: { status: document.payload }
  };
  try {
    let data = await axios(config);
  } catch (err) {
    console.error(err);
  }
};

const checkJobs = new CronJob('* * * * *', async function () {
  try {
    let response = await TwitterJobs.find({ completed: false, sendAt: {$lte: new Date() } });
    if (response.length > 0) {
      const remainingJobsToRun = response.map( async (value, index) => {
        await executeTwitterJob(value);
      });
      const promisesToResolve = await Promise.allSettled(remainingJobsToRun);
      let res = await TwitterJobs.updateMany({ completed: false, sendAt: {$lte: new Date() } }, { $set: { completed: true } });
      logStream.write(`${date.format(new Date(), 'YYYY/MM/DD HH:mm:ss')} -- ${response.length} job(s) ran and ${res.nModified} job(s) updated\n`);
    }
  } catch (err) {
    console.error(err);
  }
}, null, true, 'America/Los_Angeles');


// every 30 minutes will delete completed jobs
const deleteJobs = new CronJob('*/30 * * * *', async function () {
  try {
    let res = await TwitterJobs.deleteMany({completed: true});
    logStream.write(`${date.format(new Date(), 'YYYY/MM/DD HH:mm:ss')} -- deleted ${res.deletedCount} completed jobs\n`);
  } catch (err) {
    console.error(err);
  }
}, null, true, 'America/Los_Angeles');


module.exports = {
  checkJobs,
  deleteJobs
};