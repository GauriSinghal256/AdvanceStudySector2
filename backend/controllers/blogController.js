const mongoose = require("mongoose");
const Blog = require("../models/Blog");

// @route  GET /api/blogs
const getBlogs = async (req, res) => {
  try {
    const filter = {};

    if (req.query.category && req.query.category.toLowerCase() !== "all") {
      filter.category = new RegExp(`^${req.query.category.trim()}$`, "i");
    }

    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search.trim(), "i");
      filter.$or = [
        { title: searchRegex },
        { content: searchRegex },
        { category: searchRegex },
      ];
    }

    const blogs = await Blog.find(filter)
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to fetch blogs" });
  }
};

// @route  GET /api/blogs/:id
const getBlogById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const blog = await Blog.findById(req.params.id).populate("author", "name email");
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to fetch blog" });
  }
};

// @route  POST /api/blogs  (admin only)
const createBlog = async (req, res) => {
  try {
    const { title, content, coverImage, category } = req.body;
    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const blog = await Blog.create({
      title: title.trim(),
      content: content.trim(),
      coverImage: coverImage?.trim() || "",
      category: category?.trim() || "General",
      author: req.user._id,
    });

    await blog.populate("author", "name email");
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to create blog" });
  }
};

// @route  PUT /api/blogs/:id  (admin only)
const updateBlog = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const { title, content, coverImage, category } = req.body;

    if (title !== undefined) {
      if (!title.trim()) return res.status(400).json({ message: "Title cannot be empty" });
      blog.title = title.trim();
    }
    if (content !== undefined) {
      if (!content.trim()) return res.status(400).json({ message: "Content cannot be empty" });
      blog.content = content.trim();
    }
    if (coverImage !== undefined) {
      blog.coverImage = coverImage.trim();
    }
    if (category !== undefined) {
      blog.category = category.trim() || "General";
    }

    await blog.save();
    await blog.populate("author", "name email");
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to update blog" });
  }
};

// @route  DELETE /api/blogs/:id  (admin only)
const deleteBlog = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    await blog.deleteOne();
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to delete blog" });
  }
};

// @route  PUT /api/blogs/:id/like  (any logged-in user)
const toggleLike = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (!Array.isArray(blog.likes)) {
      blog.likes = [];
    }

    const userId = req.user._id.toString();
    const alreadyLiked = blog.likes.some((id) => id && id.toString() === userId);

    if (alreadyLiked) {
      blog.likes = blog.likes.filter((id) => id && id.toString() !== userId);
    } else {
      blog.likes.push(req.user._id);
    }

    await blog.save();
    res.json({ likesCount: blog.likes.length, liked: !alreadyLiked });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to toggle like" });
  }
};

module.exports = { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog, toggleLike };
