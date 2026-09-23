require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const startKeepAlive = require("./keepAlive");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/uploads", uploadRoutes);

// Health check / Keep-alive ping endpoints
const healthCheck = (req, res) => {
  res.status(200).json({ status: "alive", timestamp: new Date().toISOString() });
};
app.get("/ping", healthCheck);
app.get("/health", healthCheck);
app.get("/api/health", healthCheck);

app.get("/", (req, res) => res.json({ message: "Blog API is running", status: "ok" }));

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.originalUrl} not found` });
});

// Centralized error-handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);

  if (err.name === "CastError") {
    return res.status(404).json({ message: "Resource not found" });
  }
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }
  if (err.code === 11000) {
    return res.status(400).json({ message: "Duplicate value entered for a unique field" });
  }

  const statusCode = res.statusCode !== 200 ? res.statusCode : (err.statusCode || 500);
  res.status(statusCode).json({
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  startKeepAlive();
});
