import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add Olympic ID token to requests
api.interceptors.request.use((config) => {
  const olympicToken = localStorage.getItem('olympic_token')
  if (olympicToken) {
    config.headers.Authorization = `Bearer ${olympicToken}`
  }
  return config
})

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle Olympic ID token refresh or redirect to login
      window.location.href = '/auth/login'
    }
    return Promise.reject(error)
  }
)

export default api
