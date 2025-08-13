const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, unique: true },
  username:String,
  password: String,
  bio: String,
});

module.exports = mongoose.model("User", userSchema);
