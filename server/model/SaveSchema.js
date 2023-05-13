const mongoose = require("mongoose");

const SaveSchema = new mongoose.Schema(
  {
    shortcode: String,
    link: String,
    videoURL: String,
  },
  { timestamps }
);

module.exports = mongoose.mongo.model("videodata", SaveSchema);
