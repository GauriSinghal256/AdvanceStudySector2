import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './blog.css'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate(location.state?.from || '/blog')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return <section className="page-section section-wrap auth-page">
    <h1>Log <em>in.</em></h1>
    {error && <p className="blog-error">{error}</p>}
    <form className="auth-form" onSubmit={handleSubmit}>
      <label>Email
        <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </label>
      <label>Password
        <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      </label>
      <button className="button button-primary" type="submit" disabled={loading}>{loading ? 'Logging in…' : 'Log in'}</button>
    </form>
  </section>
}
