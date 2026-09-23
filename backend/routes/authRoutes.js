const express = require("express");
const { login, getMe } = require("../controllers/authController");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.post("/login", login);
router.get("/me", protect, adminOnly, getMe);

module.exports = router;
