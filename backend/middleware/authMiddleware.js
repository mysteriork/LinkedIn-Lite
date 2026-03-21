const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.verifyJwt = async (req, res, next) => {
  try {
    const token =
      req.cookies?.AccessToken || req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const matchedToken = await User.findById(decoded._id).select(
      "-password -refreshToken",
    );

    if (!matchedToken) {
      return res.status(401).json({ message: "User not found" })
    }
    console.log("token matched");
    
    req.user = matchedToken;
    next();
  } catch (error) {
    res.status(402).json({ message: "Error at verifyJWT middleware" });
  }
};
