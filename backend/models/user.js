const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, unique: true },
  username: String,
  password: { type: String, unique: true },
  newPassword: { type: String, default: null ,unique:true},
  bio: String,
});

module.exports = mongoose.model("User", userSchema);
