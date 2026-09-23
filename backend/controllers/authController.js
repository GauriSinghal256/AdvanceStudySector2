const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// @route  POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Direct login via configured credentials in .env
    if (adminEmail && normalizedEmail === adminEmail && adminPassword && password === adminPassword) {
      let user = await User.findOne({ email: adminEmail });
      if (!user) {
        user = new User({
          name: process.env.ADMIN_NAME || "Admin",
          email: adminEmail,
          password: adminPassword,
          role: "admin",
        });
        await user.save();
      } else {
        let changed = false;
        if (user.role !== "admin") {
          user.role = "admin";
          changed = true;
        }
        if (process.env.ADMIN_NAME && user.name !== process.env.ADMIN_NAME) {
          user.name = process.env.ADMIN_NAME;
          changed = true;
        }
        const matchesPwd = await user.comparePassword(adminPassword);
        if (!matchesPwd) {
          user.password = adminPassword;
          changed = true;
        }
        if (changed) {
          await user.save();
        }
      }

      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    }

    // Check existing database users
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to log in" });
  }
};

// @route  GET /api/auth/me
const getMe = async (req, res) => {
  res.json(req.user);
};

module.exports = { login, getMe };
