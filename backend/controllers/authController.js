const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.register = async (req, res) => {
  console.log(req.body);
  
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

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user: { _id: user._id, firstname: user.firstname, lastname: user.lastname },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
