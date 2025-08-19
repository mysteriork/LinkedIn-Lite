require("dotenv").config();
const express = require("express");
const connectionDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

connectionDB().then(() => {
  app.listen(5000, () => console.log("Server running on port 5000"));
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// app.post("/register", async (req, res) => {
//   const { password } = req.body;
//   try {
//     const hashed = await bcrypt.hash(password, 10);
//     const user = new User({ ...req.body, password: hashed });
//     await user.save();
//     res.status(201).json({ message: "User registered" });
//   } catch (error) {
//     console.log("error in registering at backend", error.message);
//   }
// });

// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = await User.findOne({ username });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     res.json({
//       message: "login successful",
//       user: {
//         _id: user._id,
//         firstname: user.firstname,
//         lastname: user.lastname,
//       },
//     });
//   } catch (error) {
//     console.log("error login at backend", error.message);
//   }
// });

// app.delete("/delete/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deleted = await homeDatabase.findByIdAndDelete(id);
//     res.status(200).send({ message: "data deleted", data: deleted });
//   } catch (error) {
//     res.status(500).send("error in deleting database at server");
//   }
// });
// app.get("/user/data", async (req, res) => {
//   try {
//     const matched = await homeDatabase.find();
//     res
//       .status(201)
//       .send({ msg: "data matched and fetched", status: true, data: matched });
//   } catch (error) {
//     res.status(400).send({ msg: "not matched and fetched", status: false });
//   }
// });

// app.post("/user/profile", async (req, res) => {
//   try {
//     const { firstname } = req.body;
//     const profileData = await User.findOne({ firstname: firstname });
//     res.json(profileData);
//   } catch (error) {
//     console.log("profile data error at backend", error.message);
//   }
// });

// app.post("/user", upload.single("image"), async (req, res) => {

//   try {
//     const { text } = req.body;
//     const imageUrl = req.file ? req.file.path : null;

//     const newdata = new homeDatabase({
//       ...req.body,
//       post: text,
//       image: imageUrl,
//     });
//     await newdata.save();
//     res
//       .status(201)
//       .send({ msg: "data sent at backend", status: true, data: newdata });
//   } catch (error) {
//     console.log("data error at backend", error.message);
//     res
//       .status(500)
//       .send({ msg: "Error fetching data at backend", status: false });
//   }
// });
