import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import { Reveal } from '../common/Reveal'
import { OverlayHero } from '../common/OverlayHero'
import './blog.css'

function excerpt(text, len = 120) {
  if (!text) return ''
  return text.length > len ? text.slice(0, len).trim() + '…' : text
}

export function BlogListPage() {
  const { user, token, isAdmin } = useAuth()
  const [blogs, setBlogs] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    api.getBlogs()
      .then((data) => { setBlogs(data); setStatus('ready') })
      .catch(() => setStatus('error'))
  }, [])

  const handleLike = async (id) => {
    if (!user) return
    try {
      const { liked } = await api.toggleLike(id, token)
      setBlogs((prev) => prev.map((b) => {
        if (b._id !== id) return b
        const likes = liked ? [...b.likes, user._id] : b.likes.filter((u) => u !== user._id)
        return { ...b, likes }
      }))
    } catch {
      // silent — like is a minor action, no need to break the page
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog? This cannot be undone.')) return
    try {
      await api.deleteBlog(id, token)
      setBlogs((prev) => prev.filter((blog) => blog._id !== id))
    } catch {
      setStatus('error')
    }
  }

  return <section className="page-section blog-page section-wrap">
    <OverlayHero
      title={<>Our<br /><em>blog.</em></>}
      image="/blog.jpg"
      imageAlt="Students learning together"
    />
    <div className="page-heading">
      <Reveal><h1>Our <em>Blog.</em></h1></Reveal>
      <div className="page-heading-side">
        <p>Thoughts, updates and stories from our team.</p>
      </div>
    </div>

    {status === 'loading' && <p className="blog-status">Loading blogs…</p>}
    {status === 'error' && <p className="blog-error">Couldn&apos;t load blogs. Is the backend running?</p>}
    {status === 'ready' && blogs.length === 0 && <p className="blog-empty">No blogs yet. Check back soon.</p>}

    <div className="blog-grid">
      {blogs.map((blog, i) => {
        const liked = user && blog.likes?.includes(user._id)
        return <Reveal key={blog._id} delay={i * 60}>
          <article className="blog-card">
            <Link to={`/blog/${blog._id}`}>
              <img className="blog-card-img" src={blog.coverImage || '/vite.svg'} alt={blog.title} />
            </Link>
            <div className="blog-card-body">
              <Link to={`/blog/${blog._id}`}><h3>{blog.title}</h3></Link>
              <p className="blog-card-excerpt">{excerpt(blog.content)}</p>
              <div className="blog-card-meta">
                <span>{blog.author?.name || 'Admin'}</span>
                <button
                  className={`blog-like-btn ${liked ? 'liked' : ''}`}
                  onClick={() => handleLike(blog._id)}
                  disabled={!user}
                  title={user ? 'Like this blog' : 'Log in to like'}
                >
                  ♥ {blog.likes?.length || 0}
                </button>
              </div>
            </div>
          </article>
          {isAdmin && <div className="blog-admin-actions">
            <Link className="blog-admin-edit" to={`/blog/edit/${blog._id}`}>Edit</Link>
            <button className="blog-admin-delete" onClick={() => handleDelete(blog._id)}>Delete</button>
          </div>}
        </Reveal>
      })}
    </div>
    <div className="blog-add-actions">
      <Link
        className="circle-link"
        to={isAdmin ? '/blog/new' : '/login'}
        state={isAdmin ? undefined : { from: '/blog/new' }}
      >
        Add blog <span>→</span>
      </Link>
    </div>
  </section>
}
