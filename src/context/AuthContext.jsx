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
    return data
  }

  const login = async (email, password) => {
    const data = await api.login({ email, password })
    return persist(data)
  }
  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('blog_token')
  }

  const isAdmin = user?.role === 'admin'

  return <AuthContext.Provider value={{ user, token, loading, login, logout, isAdmin }}>
    {children}
  </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
