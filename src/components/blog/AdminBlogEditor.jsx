import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import './blog.css'

export function AdminBlogEditor() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const { token } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', content: '', coverImage: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!isEdit) return
    api.getBlog(id)
      .then((blog) => setForm({ title: blog.title, content: blog.content, coverImage: blog.coverImage || '' }))
      .catch(() => setError('Could not load this blog.'))
      .finally(() => setLoading(false))
  }, [id, isEdit])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const saved = isEdit
        ? await api.updateBlog(id, form, token)
        : await api.createBlog(form, token)
      navigate(`/blog/${saved._id}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    setUploading(true)
    try {
      const { url } = await api.uploadImage(file, token)
      setForm((prev) => ({ ...prev, coverImage: url }))
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  if (loading) return <section className="page-section section-wrap"><p className="blog-status">Loading…</p></section>

  return <section className="page-section section-wrap editor-page">
    <h1>{isEdit ? 'Edit' : 'Write a'} <em>blog.</em></h1>
    {error && <p className="blog-error">{error}</p>}
    <form className="auth-form" onSubmit={handleSubmit}>
      <label>Title
        <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      </label>
      <label>Cover image (optional)
        <input type="file" accept="image/*" onChange={handleImageChange} disabled={uploading} />
      </label>
      {uploading && <p className="blog-status upload-status">Uploading image…</p>}
      {form.coverImage && <img className="editor-image-preview" src={form.coverImage} alt="Blog cover preview" />}
      <label>Content
        <textarea required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
      </label>
      <div className="editor-actions">
        <button className="button button-primary" type="submit" disabled={saving || uploading}>{saving ? 'Saving…' : isEdit ? 'Save changes' : 'Publish'}</button>
        <button type="button" className="text-button" onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </form>
  </section>
}
