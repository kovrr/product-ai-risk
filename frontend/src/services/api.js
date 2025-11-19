import axios from 'axios';

// Detect environment at runtime
const isDevelopment = window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1';

// Development: direct connection to Django on port 8000
// Production: use nginx proxy (no port needed)
const API_BASE_URL = isDevelopment
  ? 'http://localhost:8000/api'
  : '/api';

console.log(`API Base URL: ${API_BASE_URL} (${isDevelopment ? 'Development' : 'Production'} mode)`);

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login if unauthorized
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
