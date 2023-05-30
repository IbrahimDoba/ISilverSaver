const mongoose = require("mongoose");

const SaveSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    itag: {
      type: Number,
    },
    qualityLabel : {
      type: String
    },
    title: {
      type: String,
      required: true
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model("videodatas", SaveSchema);
