require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, unique: true },
    username: { type: String },
    password: { type: String, unique: true },
    newPassword: { type: String, default: null, unique: true },
    bio: { type: String },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      firstname: this.firstname,
      username: this.username,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: process.env.ACCESS_EXPIRE_KEY,
    },
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: process.env.REFRESH_EXPIRE_KEY,
    },
  );
};

module.exports = mongoose.model("User", userSchema);
