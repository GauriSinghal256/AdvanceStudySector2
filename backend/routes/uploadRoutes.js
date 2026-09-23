const express = require("express");
const multer = require("multer");
const { uploadImage } = require("../controllers/uploadController");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.startsWith("image/")) {
      return callback(new Error("Only image files (JPEG, PNG, WEBP, etc.) are allowed"), false);
    }
    callback(null, true);
  },
});

const handleMulterUpload = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "File size cannot exceed 5MB" });
      }
      return res.status(400).json({ message: err.message });
    }
    if (err) {
      return res.status(400).json({ message: err.message || "Failed to process image upload" });
    }
    next();
  });
};

router.post("/image", protect, adminOnly, handleMulterUpload, uploadImage);

module.exports = router;