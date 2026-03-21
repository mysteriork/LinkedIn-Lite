const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.register = async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const user = new User({ ...req.body, password: hashed });
    await user.save();
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      throw new Error(401, "username and password required !!! ");
    }
    const user = await User.findOne({ username });

    if (
      !user ||
      !(
        (await bcrypt.compare(password, user.password)) ||
        bcrypt.compare(password, user.newPassword)
      )
    ) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const AccessToken = await user.generateAccessToken();
    const RefreshToken = await user.generateRefreshToken();

    user.refreshToken = RefreshToken;
    await user.save({ validateBeforeSave: false });

    console.log("Token Generated");

    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .cookie("AccessToken", AccessToken, options)
      .cookie("refreshtoken", RefreshToken, options)
      .json({
        message: "Login successful",
        user: {
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          RefreshToken,
          AccessToken,
        },
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.reset = async (req, res) => {
  const { newPword, password } = req.body;

  try {
    const user = await User.findOne({ username: newPword });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.newPassword = hashedPassword;
    await user.save();
    res.status(200).json({ message: "New Password reset", data: password });
  } catch (error) {
    console.log("error reseting password", error.message);

    res.status(500).json("Error in Reseting password", error.message);
  }
};
