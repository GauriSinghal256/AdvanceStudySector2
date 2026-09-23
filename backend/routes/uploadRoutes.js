const express = require("express");
const multer = require("multer");
const { uploadImage } = require("../controllers/uploadController");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    callback(null, file.mimetype.startsWith("image/"));
  },
});

router.post("/image", protect, adminOnly, upload.single("image"), uploadImage);

module.exports = router;