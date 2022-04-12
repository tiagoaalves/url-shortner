const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      db
        .replace("USERNAME", process.env.USERNAME)
        .replace("PASSWORD", process.env.PASSWORD),
      {
        useNewUrlParser: true,
      }
    );
    console.log("Connected to MongoDB...");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
