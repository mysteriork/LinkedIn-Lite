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

    res.json({
      message: "Login successful",
      user: {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.reset = async (req, res) => {
  const { newPword, password } = req.body;
  console.log(req.body);

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
    res.status(500).json("Error in Reseting password");
  }
};
