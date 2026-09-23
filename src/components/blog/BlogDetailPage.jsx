import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import './blog.css'

export function BlogDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, token } = useAuth()
  const [blog, setBlog] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    api.getBlog(id)
      .then((data) => { setBlog(data); setStatus('ready') })
      .catch(() => setStatus('error'))
  }, [id])

  const handleLike = async () => {
    if (!user) return
    const { liked } = await api.toggleLike(id, token)
    setBlog((prev) => ({
      ...prev,
      likes: liked ? [...prev.likes, user._id] : prev.likes.filter((u) => u !== user._id),
    }))
  }

  if (status === 'loading') return <section className="page-section section-wrap"><p className="blog-status">Loading…</p></section>
  if (status === 'error' || !blog) return <section className="page-section section-wrap"><p className="blog-error">Blog not found.</p></section>

  const liked = user && blog.likes?.includes(user._id)

  return <section className="page-section section-wrap">
    <button className="back-button" onClick={() => navigate('/blog')}>← Back to blog</button>
    <article className="blog-detail">
      {blog.coverImage && <img className="blog-detail-cover" src={blog.coverImage} alt={blog.title} />}
      <h1>{blog.title}</h1>
      <div className="blog-detail-meta">
        <span>{blog.author?.name || 'Admin'}</span>
        <span>·</span>
        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="blog-detail-content">{blog.content}</div>

      <div className="blog-detail-actions">
        <button
          className={`blog-like-btn ${liked ? 'liked' : ''}`}
          onClick={handleLike}
          disabled={!user}
          title={user ? 'Like this blog' : 'Log in to like'}
        >
          ♥ {blog.likes?.length || 0} {liked ? 'Liked' : 'Like'}
        </button>

      </div>
    </article>
  </section>
}
