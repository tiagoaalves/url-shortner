const express = require("express");
const router = express.Router();
const config = require("config");
const ValidUrl = require("valid-url");
const Url = require("../models/Url");
const { nanoid } = require("nanoid");

router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get("baseUrl");

  //check if long_url is valid
  if (ValidUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        await url.updateOne({ $inc: { timesShortened: 1 } });
        url.timesShortened++;
        res.status(200).json(url);
      } else {
        const urlCode = nanoid();
        const shortUrl = baseUrl + "/" + urlCode;

        url = new Url({
          urlCode,
          longUrl,
          shortUrl,
          timesShortened: 1,
          timesAcessed: 0,
        });

        await url.save();

        res.status(200).json(url);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json("Server Error");
    }
  } else {
    res.status(401).json("Invalid URL");
  }
});

module.exports = router;
