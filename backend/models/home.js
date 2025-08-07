const mongoose = require("mongoose");

const database = new mongoose.Schema(
  {
    post: {
      type: String,
      required: true
    },
    user:{
      type:String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("profilePost", database);

