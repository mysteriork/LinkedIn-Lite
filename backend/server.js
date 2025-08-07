const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const homeDatabase = require("./models/home");
const bcrypt = require("bcrypt");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(5000, () => console.log("Server running on port 5000"))
  )
  .catch((err) => console.error(err));



app.post("/register", async (req, res) => {
  const { password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ ...req.body, password: hashed });
    await user.save();
    res.status(201).json({ message: "User registered" });
  } catch (error) {
    console.log("error in registering at backend", error.message);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({
      message: "login successful",
      user: {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    });
  } catch (error) {
    console.log("error login at backend", error.message);
  }
});

app.get("/user/data", async (req, res) => {
  try {
    const matched = await homeDatabase.find();
    res
      .status(201)
      .send({ msg: "data matched and fetched", status: true, data: matched });
  } catch (error) {
    res.status(400).send({ msg: "not matched and fetched", status: false });
  }
});

app.post("/user/profile",async (req, res) => {

  try {
    const {firstname}=req.body
    const profileData = await User.findOne({firstname:firstname});
    res.json(profileData);

  } catch (error) {
    console.log('profile data error at backend',error.message);
    
  }
});

app.post("/user", async (req, res) => {

  try {
    const {text,user}=req.body
    
    const newdata = new homeDatabase({post:text,user:user});
    await newdata.save();
    res
      .status(201)
      .send({ msg: "data sent at backend", status: true, data: newdata });
  } catch (error) {
    console.log("data error at backend", error.message);
    res
      .status(500)
      .send({ msg: "Error fetching data at backend", status: false });
  }
});

