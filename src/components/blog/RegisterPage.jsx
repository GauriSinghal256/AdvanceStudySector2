import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './blog.css'

export function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(form.name, form.email, form.password)
      navigate('/blog')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return <section className="page-section section-wrap auth-page">
    <h1>Create <em>admin.</em></h1>
    {error && <p className="blog-error">{error}</p>}
    <form className="auth-form" onSubmit={handleSubmit}>
      <label>Name
        <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </label>
      <label>Email
        <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </label>
      <label>Password
        <input type="password" required minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      </label>
      <button className="button button-primary" type="submit" disabled={loading}>{loading ? 'Creating account…' : 'Sign up'}</button>
    </form>
    <p className="auth-switch">Already have an admin account? <Link to="/login">Log in</Link></p>
  </section>
}
