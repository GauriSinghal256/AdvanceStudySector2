import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../services/api'
import { Reveal } from '../common/Reveal'
import { OverlayHero } from '../common/OverlayHero'
import './blog.css'

function calculateReadTime(text) {
  if (!text) return '1 min read'
  const words = text.trim().split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(words / 180))
  return `${minutes} min read`
}

function formatDate(isoString) {
  if (!isoString) return ''
  try {
    const d = new Date(isoString)
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

function excerpt(text, len = 110) {
  if (!text) return ''
  return text.length > len ? text.slice(0, len).trim() + '…' : text
}

export function BlogListPage() {
  const [blogs, setBlogs] = useState([])
  const [status, setStatus] = useState('loading')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    setStatus('loading')
    api.getBlogs()
      .then((data) => {
        setBlogs(Array.isArray(data) ? data : [])
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  // Extract unique categories from blogs
  const categories = useMemo(() => {
    const set = new Set(['All'])
    blogs.forEach((b) => {
      if (b.category && b.category.trim()) {
        set.add(b.category.trim())
      }
    })
    return Array.from(set)
  }, [blogs])

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        (blog.category && blog.category.toLowerCase() === selectedCategory.toLowerCase())

      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        blog.title.toLowerCase().includes(q) ||
        (blog.content && blog.content.toLowerCase().includes(q)) ||
        (blog.category && blog.category.toLowerCase().includes(q))

      return matchesCategory && matchesSearch
    })
  }, [blogs, selectedCategory, searchQuery])

  return (
    <section className="page-section blog-page section-wrap">
      <OverlayHero
        label="Advance Study Sector"
        title={<>Our <em>Blog.</em></>}
        intro="Insights, study guidance, exam strategies, and educational updates from our faculty."
        image="/blog.jpg"
        imageAlt="Advance Study Sector Campus and Students"
      />

      {/* Filter and Search Bar */}
      <div className="blog-toolbar-container">
        <div className="blog-search-box">
          <svg className="blog-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search articles, topics or keywords…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="blog-search-input"
          />
          {searchQuery && (
            <button
              className="blog-search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="blog-category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`blog-cat-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading Skeleton */}
      {status === 'loading' && (
        <div className="blog-grid">
          {[1, 2, 3].map((n) => (
            <div key={n} className="blog-card-skeleton">
              <div className="skeleton-thumb shimmer" />
              <div className="skeleton-body">
                <div className="skeleton-line sm shimmer" />
                <div className="skeleton-line lg shimmer" />
                <div className="skeleton-line md shimmer" />
                <div className="skeleton-footer shimmer" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {status === 'error' && (
        <div className="blog-status-box blog-error-box">
          <div className="status-icon">⚠️</div>
          <h3>Unable to Load Articles</h3>
          <p>We couldn't connect to the server right now. Please verify your connection and try refreshing.</p>
          <button className="button button-primary" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      )}

      {/* Empty States */}
      {status === 'ready' && blogs.length === 0 && (
        <div className="blog-status-box blog-empty-box">
          <div className="status-icon">📚</div>
          <h3>No Articles Published Yet</h3>
          <p>Our team is currently preparing new study resources and educational blogs. Check back soon!</p>
        </div>
      )}

      {status === 'ready' && blogs.length > 0 && filteredBlogs.length === 0 && (
        <div className="blog-status-box blog-empty-box">
          <div className="status-icon">🔍</div>
          <h3>No Matching Articles Found</h3>
          <p>
            No blogs matched &ldquo;{searchQuery}&rdquo; in category &ldquo;{selectedCategory}&rdquo;.
          </p>
          <button
            className="button button-primary"
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('All')
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Blog Cards Grid */}
      {status === 'ready' && filteredBlogs.length > 0 && (
        <div className="blog-grid">
          {filteredBlogs.map((blog, i) => {
            const readTime = calculateReadTime(blog.content)
            const dateStr = formatDate(blog.createdAt)
            const categoryName = blog.category || 'Academic'

            return (
              <Reveal key={blog._id} delay={(i % 3) * 70}>
                <article className="blog-card">
                  <Link to={`/blog/${blog._id}`} className="blog-card-media-wrap">
                    {blog.coverImage ? (
                      <img
                        className="blog-card-img"
                        src={blog.coverImage}
                        alt={blog.title}
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                    ) : null}
                    <div
                      className="blog-card-fallback-thumb"
                      style={{ display: blog.coverImage ? 'none' : 'flex' }}
                    >
                      <span>{categoryName}</span>
                    </div>
                    <span className="blog-card-badge">{categoryName}</span>
                  </Link>

                  <div className="blog-card-body">
                    <div className="blog-card-submeta">
                      <span className="blog-read-time">{readTime}</span>
                      {dateStr && <span className="blog-date">{dateStr}</span>}
                    </div>

                    <Link to={`/blog/${blog._id}`} className="blog-card-title-link">
                      <h3 className="blog-card-title">{blog.title}</h3>
                    </Link>

                    <p className="blog-card-excerpt">{excerpt(blog.content)}</p>

                    <div className="blog-card-footer">
                      <div className="blog-author-info">
                        <div className="blog-author-avatar">
                          {(blog.author?.name || 'A')[0].toUpperCase()}
                        </div>
                        <span className="blog-author-name">{blog.author?.name || 'Admin'}</span>
                      </div>

                      <div className="blog-card-actions">
                        <Link to={`/blog/${blog._id}`} className="blog-read-link">
                          Read article <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      )}
    </section>
  )
}
