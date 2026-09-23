import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('blog_token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) { setLoading(false); return }
    api.me(token)
      .then(setUser)
      .catch(() => { setToken(null); localStorage.removeItem('blog_token') })
      .finally(() => setLoading(false))
  }, [token])

  const persist = (data) => {
    setUser(data)
    setToken(data.token)
    localStorage.setItem('blog_token', data.token)
  }

  const login = async (email, password) => persist(await api.login({ email, password }))
  const register = async (name, email, password) => persist(await api.register({ name, email, password }))
  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('blog_token')
  }

  const isAdmin = user?.role === 'admin'

  return <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAdmin }}>
    {children}
  </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
