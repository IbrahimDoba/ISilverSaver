const mongoose = require("mongoose");

const SaveSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
);

module.exports = mongoose.model("videodatas", SaveSchema);
