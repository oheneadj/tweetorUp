require("dotenv").config({ path: __dirname + "/.env" });
const { twitterClient } = require("./twitterClient.js");
const CronJob = require("cron").CronJob;

const tweet = async () => {
  try {
    await twitterClient.v2.tweet("Hello world!");
  } catch (e) {
    console.log(e);
  }
};

const cronTweet = new CronJob("0 */4 * * *", async () => {
  tweet();
});

cronTweet.start();
