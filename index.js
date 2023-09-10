const express = require("express");
const day = require("moment");
const moment = require("moment-timezone"); // Import moment-timezone
const app = express();

app.get("/api", (req, res) => {
  try {
    const slackName = req.query.slack_name;
    const track = req.query.track;
    const currentDay = day().format("dddd");
    // Get the current time in UTC
    const currentUtcTime = moment().tz("UTC");

    // Get the current UTC offset in minutes
    const utcOffsetMinutes = currentUtcTime.utcOffset();

    // Check if the UTC offset is within +/-2 minutes
    const isValidUtcOffset = Math.abs(utcOffsetMinutes) <= 2;

    if (!isValidUtcOffset) {
      return res.status(400).json({
        error: "Invalid UTC Offset",
        status_code: 400,
      });
    }

    // Format the UTC time
    const formattedUtcTime = currentUtcTime.format("HH:mm:ssZ");

    // Construct the GitHub file URL
    const githubRepo = "MUFTIATBAKARE/endpoint_one";
    const githubFilePath = "main/index.js";
    const githubFileUrl = `https://github.com/${githubRepo}/blob/${githubFilePath}`;
    const githubRepoUrl = `https://github.com/${githubRepo}`;

    // Include the status code in the response
    const statusCode = 200;

    res.status(statusCode).json({
      slack_name: slackName,
      current_day: currentDay,
      utc_time: formattedUtcTime,
      track: track,
      github_file_url: githubFileUrl,
      github_repo_url: githubRepoUrl,
      status_code: statusCode,
    });
  } catch (error) {
    console.error("Error:", error.message);

    // Set a 500 Internal Server Error status code
    const statusCode = 500;

    res.status(statusCode).json({
      error: "Internal Server Error",
      status_code: statusCode,
    });
  }
});

app.listen(3000, () => console.log("API is running..."));
