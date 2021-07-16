const CronJob = require('cron').CronJob;
const { TwitterJobs } = require('../../db/schema');
const models = require('../../db/models/jobs');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const date = require('date-and-time');
const FormData = require('form-data');


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
    await axios(config);
  } catch (err) {
    logStream.write(`${date.format(new Date(), 'YYYY/MM/DD HH:mm:ss')} -- cron executeTwitterJob has an error for ${document._id}\n`);
  }
};

const checkJobs = new CronJob('* * * * *', async function () {
  try {
    let twitterResponse = await TwitterJobs.find({ completed: false, sendAt: {$lte: new Date() } });
    if (twitterResponse.length > 0) {
      const remainingTwitterJobsToRun = twitterResponse.map( async (value, index) => {
        await executeTwitterJob(value);
      });
      const promisesToResolve = await Promise.allSettled(remainingTwitterJobsToRun);
      let res = await TwitterJobs.updateMany({ completed: false, sendAt: {$lte: new Date() } }, { $set: { completed: true } });
      logStream.write(`${date.format(new Date(), 'YYYY/MM/DD HH:mm:ss')} -- ${twitterResponse.length} Twitter job(s) ran and ${res.nModified} job(s) updated\n`);
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