const express = require("express");
const router = express.Router();
const Url = require("../models/Url");

//redirects the user to the original version of the url
router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      //increase the number of times acessed by 1
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

module.exports = router;
