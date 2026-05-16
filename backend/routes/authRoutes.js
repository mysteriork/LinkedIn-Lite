const express = require("express");
const { register, login, reset } = require("../controllers/authController");
const  {verifyJwt}  = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/reset", verifyJwt, reset);

module.exports = router;
