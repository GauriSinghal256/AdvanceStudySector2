import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { api } from '../../services/api'
import './blog.css'

function calculateReadTime(text) {
  if (!text) return '1 min read'
  const words = text.trim().split(/\s+/).length
  return `${Math.max(1, Math.ceil(words / 180))} min read`
}

function formatDate(isoString) {
  if (!isoString) return ''
  try {
    const d = new Date(isoString)
    return d.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

export function BlogDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    setStatus('loading')
    api.getBlog(id)
      .then((data) => {
        setBlog(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [id])

  if (status === 'loading') {
    return (
      <section className="page-section section-wrap blog-detail-loading">
        <div className="skeleton-thumb lg shimmer" style={{ height: '360px', borderRadius: '24px' }} />
        <div style={{ marginTop: '24px' }}>
          <div className="skeleton-line lg shimmer" style={{ height: '36px', width: '70%' }} />
          <div className="skeleton-line md shimmer" style={{ height: '20px', width: '40%', marginTop: '16px' }} />
        </div>
      </section>
    )
  }

  if (status === 'error' || !blog) {
    return (
      <section className="page-section section-wrap">
        <div className="blog-status-box blog-error-box">
          <div className="status-icon">⚠️</div>
          <h3>Article Not Found</h3>
          <p>The blog post you're looking for may have been removed or does not exist.</p>
          <button className="button button-primary" onClick={() => navigate('/blog')}>
            Back to All Blogs
          </button>
        </div>
      </section>
    )
  }

  const readTime = calculateReadTime(blog.content)
  const formattedDate = formatDate(blog.createdAt)

  return (
    <section className="page-section section-wrap blog-detail-page">
      <div className="blog-detail-top-nav">
        <Link to="/blog" className="back-button">
          ← Back to all articles
        </Link>
        {blog.category && <span className="blog-card-badge">{blog.category}</span>}
      </div>

      <article className="blog-detail">
        <header className="blog-detail-header">
          <h1 className="blog-detail-title">{blog.title}</h1>

          <div className="blog-detail-meta-bar">
            <div className="blog-author-info">
              <div className="blog-author-avatar large">
                {(blog.author?.name || 'A')[0].toUpperCase()}
              </div>
              <div className="blog-author-text">
                <span className="blog-author-name">{blog.author?.name || 'Admin'}</span>
                <span className="blog-author-role">Advance Study Sector Faculty</span>
              </div>
            </div>

            <div className="blog-meta-right">
              {formattedDate && <span className="blog-meta-item">📅 {formattedDate}</span>}
              <span className="blog-meta-item">⏱️ {readTime}</span>
            </div>
          </div>
        </header>

        {blog.coverImage && (
          <div className="blog-detail-cover-wrap">
            <img className="blog-detail-cover" src={blog.coverImage} alt={blog.title} />
          </div>
        )}

        <div className="blog-detail-content">
          {blog.content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="blog-detail-footer">
          <Link to="/blog" className="circle-link">
            ← More articles
          </Link>
        </div>
      </article>
    </section>
  )
}
