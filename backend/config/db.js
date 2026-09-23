const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbName = process.env.DB_NAME || "advance_study";

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected. Waiting for reconnection...");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err.message);
    });

    await mongoose.connect(process.env.MONGO_URI, { dbName });
    console.log(`MongoDB connected successfully to database: ${mongoose.connection.name}`);
  } catch (err) {
    console.error("MongoDB initial connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
