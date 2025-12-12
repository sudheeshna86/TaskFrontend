import axios from 'axios'


//const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const baseURL = 'https://taskbackend-0ar2.onrender.com/api'
const instance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      // optional: window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default instance
