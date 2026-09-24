import { useEffect, useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import './blog.css'

const PRESET_CATEGORIES = [
  'Academics',
  'Exam Tips',
  'Course Updates',
  'Career Guidance',
  'Tech & Coding',
  'Study Techniques',
  'General',
]

export function AdminPanel() {
  const { user, token, logout } = useAuth()
  const navigate = useNavigate()

  // Views: 'create' | 'manage'
  const [activeTab, setActiveTab] = useState('create')

  // Form State
  const [editingBlogId, setEditingBlogId] = useState(null)
  const [form, setForm] = useState({
    title: '',
    category: 'Academics',
    customCategory: '',
    coverImage: '',
    content: '',
  })
  const [coverMode, setCoverMode] = useState('url') // 'upload' | 'url'
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')
  const [toast, setToast] = useState(null) // { type: 'success'|'error', message: string, blogId?: string }

  // Manage Blogs State
  const [blogs, setBlogs] = useState([])
  const [loadingBlogs, setLoadingBlogs] = useState(true)
  const [blogSearch, setBlogSearch] = useState('')
  const [deletingId, setDeletingId] = useState(null)

  // Load all blogs
  const fetchBlogs = () => {
    setLoadingBlogs(true)
    api.getBlogs()
      .then((data) => setBlogs(Array.isArray(data) ? data : []))
      .catch((err) => showToast('error', err.message || 'Failed to fetch blogs'))
      .finally(() => setLoadingBlogs(false))
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 5000)
    return () => clearTimeout(timer)
  }, [toast])

  const showToast = (type, message, blogId = null) => {
    setToast({ type, message, blogId })
  }

  // Handle image file upload (Cloudinary)
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFormError('')
    setUploading(true)
    try {
      const { url } = await api.uploadImage(file, token)
      setForm((prev) => ({ ...prev, coverImage: url }))
      showToast('success', 'Image uploaded successfully!')
    } catch (err) {
      setFormError(err.message || 'Image upload failed. Try pasting an image URL instead.')
    } finally {
      setUploading(false)
    }
  }

  // Calculate live word count & read time
  const stats = useMemo(() => {
    const words = form.content.trim() ? form.content.trim().split(/\s+/).length : 0
    const readMin = Math.max(1, Math.ceil(words / 180))
    return { words, readMin }
  }, [form.content])

  // Save / Publish Blog
  const handleSaveBlog = async (e) => {
    e.preventDefault()
    setFormError('')

    const resolvedCategory =
      form.category === 'Custom'
        ? form.customCategory.trim() || 'General'
        : form.category || 'General'

    if (!form.title.trim()) {
      setFormError('Please enter a blog title.')
      return
    }
    if (!form.content.trim()) {
      setFormError('Please enter blog content.')
      return
    }

    setSaving(true)
    try {
      const payload = {
        title: form.title.trim(),
        category: resolvedCategory,
        coverImage: form.coverImage.trim(),
        content: form.content.trim(),
      }

      let savedBlog
      if (editingBlogId) {
        savedBlog = await api.updateBlog(editingBlogId, payload, token)
        showToast('success', `"${savedBlog.title}" updated successfully!`, savedBlog._id)
      } else {
        savedBlog = await api.createBlog(payload, token)
        showToast('success', `"${savedBlog.title}" published successfully!`, savedBlog._id)
      }

      // Reset form
      resetForm()
      // Refresh list
      fetchBlogs()
      // Switch to manage tab
      setActiveTab('manage')
    } catch (err) {
      setFormError(err.message || 'Failed to save blog.')
    } finally {
      setSaving(false)
    }
  }

  const resetForm = () => {
    setEditingBlogId(null)
    setForm({
      title: '',
      category: 'Academics',
      customCategory: '',
      coverImage: '',
      content: '',
    })
    setFormError('')
  }

  // Start Editing a Blog
  const handleStartEdit = (blog) => {
    setEditingBlogId(blog._id)
    const isPreset = PRESET_CATEGORIES.includes(blog.category)
    setForm({
      title: blog.title || '',
      category: isPreset ? blog.category : 'Custom',
      customCategory: isPreset ? '' : blog.category || '',
      coverImage: blog.coverImage || '',
      content: blog.content || '',
    })
    setActiveTab('create')
    window.scrollTo({ top: 120, behavior: 'smooth' })
  }

  // Delete a Blog
  const handleDeleteBlog = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return
    }
    setDeletingId(id)
    try {
      await api.deleteBlog(id, token)
      setBlogs((prev) => prev.filter((b) => b._id !== id))
      showToast('success', `"${title}" was permanently deleted.`)
      if (editingBlogId === id) resetForm()
    } catch (err) {
      showToast('error', err.message || 'Failed to delete blog.')
    } finally {
      setDeletingId(null)
    }
  }

  // Filter blogs in management view
  const filteredBlogs = useMemo(() => {
    const q = blogSearch.toLowerCase().trim()
    if (!q) return blogs
    return blogs.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        (b.category && b.category.toLowerCase().includes(q))
    )
  }, [blogs, blogSearch])

  return (
    <section className="page-section section-wrap admin-dashboard">
      {/* Top Banner / Navigation */}
      <div className="admin-header">
        <div className="admin-header-info">
          <div className="admin-badge">
            <span className="admin-status-dot" /> Admin Portal
          </div>
          <h1 className="admin-title">
            Blog <em>Management.</em>
          </h1>
          <p className="admin-subtitle">
            Welcome, <strong>{user?.name || 'Administrator'}</strong> ({user?.email})
          </p>
        </div>

        <div className="admin-header-actions">
          <Link to="/blog" className="admin-action-btn secondary" target="_blank" rel="noreferrer">
            <span>View Public Blog ↗</span>
          </Link>
          <button className="admin-action-btn logout" onClick={logout}>
            Log Out
          </button>
        </div>
      </div>

      {/* Floating Feedback Toast */}
      {toast && (
        <div className={`admin-toast ${toast.type}`}>
          <div className="toast-icon">
            {toast.type === 'success' ? '✓' : '⚠️'}
          </div>
          <div className="toast-message">
            <span>{toast.message}</span>
            {toast.blogId && (
              <Link to={`/blog/${toast.blogId}`} className="toast-link" target="_blank">
                View Article ↗
              </Link>
            )}
          </div>
          <button className="toast-close" onClick={() => setToast(null)}>✕</button>
        </div>
      )}

      {/* View Switcher Tabs */}
      <div className="admin-tabs">
        <button
          className={`admin-tab-btn ${activeTab === 'create' ? 'active' : ''}`}
          onClick={() => setActiveTab('create')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14"></path>
          </svg>
          <span>{editingBlogId ? 'Edit Blog Mode' : 'Add New Blog'}</span>
        </button>

        <button
          className={`admin-tab-btn ${activeTab === 'manage' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('manage')
            fetchBlogs()
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          <span>Manage Blogs ({blogs.length})</span>
        </button>
      </div>

      {/* ========================================================
          TAB 1: ADD NEW BLOG / EDIT BLOG FORM
          ======================================================== */}
      {activeTab === 'create' && (
        <div className="admin-panel-card">
          <div className="panel-card-header">
            <div>
              <h2>{editingBlogId ? 'Edit Article' : 'Write & Publish Blog'}</h2>
              <p>
                {editingBlogId
                  ? 'Update the fields below and click Save Changes.'
                  : 'Compose informative content for students and prospective learners.'}
              </p>
            </div>
            {editingBlogId && (
              <button className="button button-ghost cancel-edit-btn" onClick={resetForm}>
                ✕ Cancel Edit
              </button>
            )}
          </div>

          {formError && (
            <div className="blog-error">
              <span>{formError}</span>
            </div>
          )}

          <form className="admin-form" onSubmit={handleSaveBlog}>
            {/* Title */}
            <div className="form-group">
              <label htmlFor="blog-title">
                Blog Title <span className="req">*</span>
              </label>
              <input
                id="blog-title"
                type="text"
                placeholder="e.g. Master Class 10th & 12th Board Exam Strategies"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            {/* Category Selector */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="blog-category">Category</label>
                <select
                  id="blog-category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  {PRESET_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                  <option value="Custom">+ Custom Category…</option>
                </select>
              </div>

              {form.category === 'Custom' && (
                <div className="form-group">
                  <label htmlFor="blog-custom-cat">
                    Custom Category Name <span className="req">*</span>
                  </label>
                  <input
                    id="blog-custom-cat"
                    type="text"
                    placeholder="e.g. Olympiad Prep"
                    value={form.customCategory}
                    onChange={(e) => setForm({ ...form, customCategory: e.target.value })}
                    required
                  />
                </div>
              )}
            </div>

            {/* Cover Image Options */}
            <div className="form-group">
              <div className="cover-mode-toggle-wrap">
                <label>Featured Cover Image (Optional)</label>
                <div className="cover-mode-pills">
                  <button
                    type="button"
                    className={`mode-pill ${coverMode === 'url' ? 'active' : ''}`}
                    onClick={() => setCoverMode('url')}
                  >
                    Image URL
                  </button>
                  <button
                    type="button"
                    className={`mode-pill ${coverMode === 'upload' ? 'active' : ''}`}
                    onClick={() => setCoverMode('upload')}
                  >
                    Upload File
                  </button>
                </div>
              </div>

              {coverMode === 'url' ? (
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or paste image link"
                  value={form.coverImage}
                  onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                />
              ) : (
                <div className="file-upload-box">
                  <input
                    type="file"
                    id="cover-file-input"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploading}
                  />
                  <label htmlFor="cover-file-input" className="file-upload-label">
                    {uploading ? (
                      <span>Uploading to Cloudinary…</span>
                    ) : (
                      <span>📁 Choose an image from your computer</span>
                    )}
                  </label>
                </div>
              )}

              {/* Cover Preview */}
              {form.coverImage && (
                <div className="cover-preview-box">
                  <img src={form.coverImage} alt="Cover Preview" />
                  <button
                    type="button"
                    className="remove-cover-btn"
                    onClick={() => setForm({ ...form, coverImage: '' })}
                    title="Remove image"
                  >
                    ✕ Remove Image
                  </button>
                </div>
              )}
            </div>

            {/* Content Textarea */}
            <div className="form-group">
              <div className="content-label-row">
                <label htmlFor="blog-content">
                  Content (Multi-paragraph supported) <span className="req">*</span>
                </label>
                <span className="content-stats">
                  {stats.words} words · ~{stats.readMin} min read
                </span>
              </div>
              <textarea
                id="blog-content"
                rows="14"
                placeholder="Write your article here. Use double Enter for separate paragraphs..."
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                required
              />
            </div>

            {/* Actions */}
            <div className="form-actions-bar">
              <button
                type="submit"
                className="button button-primary"
                disabled={saving || uploading}
              >
                {saving ? (
                  <span className="btn-spinner-wrap">
                    <span className="btn-spinner" /> Saving…
                  </span>
                ) : editingBlogId ? (
                  'Save Changes ✓'
                ) : (
                  'Publish Blog Article →'
                )}
              </button>

              {editingBlogId && (
                <button
                  type="button"
                  className="button button-ghost"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* ========================================================
          TAB 2: MANAGE BLOGS (EDIT & DELETE)
          ======================================================== */}
      {activeTab === 'manage' && (
        <div className="admin-panel-card">
          <div className="panel-card-header">
            <div>
              <h2>Manage Existing Blogs</h2>
              <p>Browse, review, edit or delete published articles in Advance Study Sector.</p>
            </div>
            <div className="manage-search-wrap">
              <input
                type="text"
                placeholder="Search blogs by title or category…"
                value={blogSearch}
                onChange={(e) => setBlogSearch(e.target.value)}
                className="manage-search-input"
              />
              <button
                type="button"
                className="button button-primary"
                style={{ padding: '10px 18px', fontSize: '13.5px', whiteSpace: 'nowrap' }}
                onClick={() => {
                  resetForm()
                  setActiveTab('create')
                }}
              >
                + Add Blog
              </button>
            </div>
          </div>

          {loadingBlogs ? (
            <div className="admin-loading-state">
              <div className="btn-spinner" style={{ width: '32px', height: '32px' }} />
              <p>Fetching blogs from database…</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="admin-empty-state">
              <div className="empty-icon">📝</div>
              <h3>No blogs published yet</h3>
              <p>Get started by creating your very first blog article.</p>
              <button
                className="button button-primary"
                onClick={() => setActiveTab('create')}
              >
                + Write First Blog
              </button>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="admin-empty-state">
              <h3>No blogs match &ldquo;{blogSearch}&rdquo;</h3>
              <button
                className="button button-primary"
                onClick={() => setBlogSearch('')}
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="manage-blog-list">
              {filteredBlogs.map((b) => (
                <div key={b._id} className="manage-blog-item">
                  <div className="item-thumbnail">
                    {b.coverImage ? (
                      <img src={b.coverImage} alt={b.title} />
                    ) : (
                      <div className="item-thumb-placeholder">
                        {b.category ? b.category[0] : 'B'}
                      </div>
                    )}
                  </div>

                  <div className="item-details">
                    <div className="item-meta-top">
                      <span className="item-badge">{b.category || 'General'}</span>
                      <span className="item-date">
                        {new Date(b.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <h4 className="item-title">{b.title}</h4>
                    <p className="item-snippet">
                      {b.content.length > 130 ? b.content.slice(0, 130) + '…' : b.content}
                    </p>
                  </div>

                  <div className="item-actions">
                    <Link
                      to={`/blog/${b._id}`}
                      className="item-btn view-btn"
                      target="_blank"
                      rel="noreferrer"
                      title="View public page"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                      <span>View</span>
                    </Link>

                    <button
                      className="item-btn edit-btn"
                      onClick={() => handleStartEdit(b)}
                      title="Edit blog post"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                      <span>Edit</span>
                    </button>

                    <button
                      className="item-btn delete-btn"
                      onClick={() => handleDeleteBlog(b._id, b.title)}
                      disabled={deletingId === b._id}
                      title="Delete blog post"
                    >
                      {deletingId === b._id ? (
                        <span>Deleting…</span>
                      ) : (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                          <span>Delete</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
