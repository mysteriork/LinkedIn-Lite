require("dotenv").config();
const express = require("express");
const connectionDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
connectionDB().then(() => {
  app.listen(5000, () => console.log("Server running on port 5000"));
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
