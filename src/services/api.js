const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(path, { method = 'GET', body, token } = {}) {
  const isFormData = body instanceof FormData
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || 'Something went wrong')
  return data
}

export const api = {
  login: (payload) => request('/auth/login', { method: 'POST', body: payload }),
  me: (token) => request('/auth/me', { token }),

  getBlogs: () => request('/blogs'),
  getBlog: (id) => request(`/blogs/${id}`),
  createBlog: (payload, token) => request('/blogs', { method: 'POST', body: payload, token }),
  updateBlog: (id, payload, token) => request(`/blogs/${id}`, { method: 'PUT', body: payload, token }),
  deleteBlog: (id, token) => request(`/blogs/${id}`, { method: 'DELETE', token }),
  uploadImage: (file, token) => {
    const body = new FormData()
    body.append('image', file)
    return request('/uploads/image', { method: 'POST', body, token })
  },
}
