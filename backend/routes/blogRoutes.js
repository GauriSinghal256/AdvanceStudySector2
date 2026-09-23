const express = require("express");
const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  toggleLike,
} = require("../controllers/blogController");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.get("/", getBlogs);
router.get("/:id", getBlogById);

router.post("/", protect, adminOnly, createBlog);
router.put("/:id", protect, adminOnly, updateBlog);
router.delete("/:id", protect, adminOnly, deleteBlog);

router.put("/:id/like", protect, toggleLike);

module.exports = router;
