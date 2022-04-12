const express = require("express");
const router = express.Router();
const Url = require("../models/Url");

router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      await url.updateOne({ $inc: { timesAcessed: 1 } });
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("Sorry, no URL found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
});

router.get("/stats/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      return res.status(200).json(url);
    } else {
      return res.status(404).json("Sorry, no URL found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
