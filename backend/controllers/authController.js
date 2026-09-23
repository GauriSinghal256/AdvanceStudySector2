const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// @route  POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    if (!adminEmail || !adminPassword) {
      return res.status(500).json({ message: "Admin credentials are not configured" });
    }

    if (email.trim().toLowerCase() !== adminEmail || password !== adminPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    let user = await User.findOne({ email: adminEmail });
    if (!user) {
      user = new User({ name: process.env.ADMIN_NAME || "Admin", email: adminEmail, password: adminPassword, role: "admin" });
    } else {
      user.name = process.env.ADMIN_NAME || user.name;
      user.password = adminPassword;
      user.role = "admin";
    }
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route  GET /api/auth/me
const getMe = async (req, res) => {
  res.json(req.user);
};

module.exports = { login, getMe };
