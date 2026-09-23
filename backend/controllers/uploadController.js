const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "An image file is required" });

  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return res.status(500).json({ message: "Cloudinary credentials are not configured" });
  }

  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "advance-study-sector/blog" },
        (error, uploaded) => (error ? reject(error) : resolve(uploaded)),
      );
      uploadStream.end(req.file.buffer);
    });

    res.status(201).json({ url: result.secure_url });
  } catch (err) {
    res.status(502).json({ message: "Image upload failed" });
  }
};

module.exports = { uploadImage };