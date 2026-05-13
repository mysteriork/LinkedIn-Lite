const mongoose = require("mongoose");

const database = new mongoose.Schema(
  {
    post: {
      type: String,
      required: true,
    },
    user: {
      type: String,
    },
    userId: {
      type: String,
    },
    image: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

database.index({ createdAt: -1 });

module.exports = mongoose.model("profilePost", database);
