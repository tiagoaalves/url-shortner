const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
  timesShortened: Number,
  timesAcessed: Number,
});

module.exports = mongoose.model("Url", urlSchema, "shortened_url");
