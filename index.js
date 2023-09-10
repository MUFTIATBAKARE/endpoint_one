const express = require("express");
const moment = require("moment");
const github = require("github");
const app = express();

app.get("/api", (req, res) => {
  const slackName = req.query.slack_name;
  const track = req.query.track;

  const currentDay = moment().weekday();
  const utcTime = moment().format("HH:mm:ssZ");
  const githubFileUrl = github.fileUrl(
    "MUFTIATBAKARE",
    "endpoint_one",
    "main",
    "index.js"
  );
  res.json({
    slack_name: slackName,
    current_day: currentDay,
    utc_time: utcTime,
    track: track,
    github_file_url: githubFileUrl,
  });
});
app.listen(3000, () => console.log("API is running..."));
