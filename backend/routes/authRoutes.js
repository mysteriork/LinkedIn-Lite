const express = require("express");
const { register, login ,reset} = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/reset", reset);

module.exports = router;
