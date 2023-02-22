require("dotenv").config({ path: __dirname + "/.env" });
const { twitterClient } = require("./twitterClient.js");
const CronJob = require("cron").CronJob;
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const tweet = async () => {
  try {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.RAPID_API_HOST,
      },
    };

    fetch(process.env.API_URL, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response[0].fact);
        twitterClient.v2.tweet(response[0].fact);
        return response[0].fact;
      });
  } catch (e) {
    console.log(e);
  }
};

const cronTweet = new CronJob("30 * * * *", async () => {
  tweet();
});

cronTweet.start();
